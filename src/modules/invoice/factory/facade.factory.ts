
import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";
import {FindInvoiceUseCase} from "../usecases/find/find-invoice.usecase";
import {GenerateInvoiceUsecase} from "../usecases/generate/generate-invoice.usecase";

export class InvoiceFacadeFactory {
    static create(): InvoiceFacade {
        const repository = new InvoiceRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(repository);
        const generateInvoiceUseCase = new GenerateInvoiceUsecase(repository);

        const invoiceFacade = new InvoiceFacade({
            findUseCase: findInvoiceUseCase,
            generateUseCase: generateInvoiceUseCase,
        });

        return invoiceFacade;
    }
}