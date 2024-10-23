import {InvoiceGateway} from "../gateway/invoice.gateway";
import {InvoiceEntity} from "../domain/invoice.entity";
import {InvoiceModel} from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import {InvoiceItemsEntity} from "../domain/invoice-items.entity";
import Address from "../../@shared/domain/value-object/address";

export class InvoiceRepository implements InvoiceGateway {
    async add(invoice: InvoiceEntity): Promise<InvoiceEntity> {
         const invoiceCreated = await InvoiceModel.create({
             id: invoice.id.id,
             name: invoice.name,
             document: invoice.document,
             createdAt: new Date(),
             updatedAt: new Date(),
             items: invoice.items,
             address: invoice.address,
         })

        return new InvoiceEntity({
            id: new Id(invoiceCreated.id),
            name: invoiceCreated.name,
            document: invoiceCreated.document,
            items: invoiceCreated.items.map((item) => {
                return new InvoiceItemsEntity({
                    price: item.price,
                    name: item.name,
                    id: item.id,
                })
            }),
            address: new Address(
                invoiceCreated.address.street,
                invoiceCreated.address.number,
                invoiceCreated.address.complement,
                invoiceCreated.address.city,
                invoiceCreated.address.state,
                invoiceCreated.address.zipCode
            ),
        })
    }

    async find(id: string): Promise<InvoiceEntity> {
        const invoiceDB = await InvoiceModel.findOne({
            where: {
                id: id,
            }
        })

        if (!invoiceDB) {
            throw new Error("Invoice not found")
        }

        return new InvoiceEntity({
            id: new Id(invoiceDB.id),
            name: invoiceDB.name,
            document: invoiceDB.document,
            items: invoiceDB.items.map((item) => {
                return new InvoiceItemsEntity({
                    price: item.price,
                    name: item.name,
                    id: item.id,
                })
            }),
            address: new Address(
                invoiceDB.address.street,
                invoiceDB.address.number,
                invoiceDB.address.complement,
                invoiceDB.address.city,
                invoiceDB.address.state,
                invoiceDB.address.zipCode
            ),
        })
    }

}