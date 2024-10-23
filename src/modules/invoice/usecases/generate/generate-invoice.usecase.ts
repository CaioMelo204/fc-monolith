import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Client from "../../../client-adm/domain/client.entity";
import {InvoiceGateway} from "../../gateway/invoice.gateway";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.dto";
import {InvoiceEntity} from "../../domain/invoice.entity";
import {InvoiceItemsEntity} from "../../domain/invoice-items.entity";
import Address from "../../../@shared/domain/value-object/address";

export class GenerateInvoiceUsecase implements UseCaseInterface {
    constructor(private readonly invoiceRepository: InvoiceGateway) {}

    async execute(dto: GenerateInvoiceUseCaseInputDto
    ): Promise<GenerateInvoiceUseCaseOutputDto> {
        const {
            name,
            document,
            street,
            number,
            complement,
            city,
            state,
            zipCode,
            items,
        } = dto;

        const invoice = new InvoiceEntity({
            name: name,
            address: new Address(
                street,
                number,
                complement,
                city,
                state,
                zipCode,
            ),
            document: document,
            items: items.map((item) => new InvoiceItemsEntity({
                name: item.name,
                price: item.price,
                id: item.id,
            })),
        })

        await this.invoiceRepository.add(invoice)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((product) => ({
                id: product.id.id,
                name: product.name,
                price: product.price,
            })),
            total: invoice.total,
        };
    }
}