
import { FindInvoiceUseCase } from "./find-invoice.usecase";
import Address from "../../../@shared/domain/value-object/address";
import {InvoiceItemsEntity} from "../../domain/invoice-items.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import {InvoiceEntity} from "../../domain/invoice.entity";

const address = new Address(
    "Main Street",
    "123",
    "Next to the bank",
    "New York",
    "New York",
    "122343404",
)


const product1 = new InvoiceItemsEntity({
    id: "1",
    name: "Product 1",
    price: 50,
});

const product2 = new InvoiceItemsEntity({
    id: "2",
    name: "Product 2",
    price: 60,
});

const invoice = new InvoiceEntity({
    id: new Id("123"),
    name: "Invoice 1",
    document: "Document 1",
    items: [product1, product2],
    address: address,
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        add: jest.fn(),
    };
};

describe("FindInvoiceUseCase unit test", () => {
    it("should find an invoice", async () => {
        const repository = MockRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(repository);

        const result = await findInvoiceUseCase.execute({ id: "123" });

        expect(result.id).toEqual(invoice.id.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address).toEqual(invoice.address);
        expect(result.items).toEqual([
            { id: "1", name: product1.name, price: product1.price },
            { id: "2", name: product2.name, price: product2.price },
        ]);

        expect(result.total).toEqual(110);
        expect(result.createdAt).toBeTruthy();
    });
});