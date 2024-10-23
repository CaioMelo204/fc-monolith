import {InvoiceEntity} from "../domain/invoice.entity";

export interface InvoiceGateway {
    find(id: string): Promise<InvoiceEntity>;
    add(invoice: InvoiceEntity): Promise<InvoiceEntity>;
}