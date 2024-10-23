import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.dto";
import {InvoiceGateway} from "../../gateway/invoice.gateway";

export class FindInvoiceUseCase implements UseCaseInterface {
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(dto: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(dto.id)

        return {
            id: invoice.id.id,
            name: invoice.name,
            createdAt: invoice.createdAt,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            address: invoice.address,
            total: invoice.total,
            document: invoice.document,
        }
    }
}