import { Sequelize } from "sequelize-typescript";


import { InvoiceModel } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import {InvoiceItemsEntity} from "../domain/invoice-items.entity";
import {InvoiceEntity} from "../domain/invoice.entity";

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should add an invoice", async () => {
        const address = new Address(
            "Main Street",
            "123",
            "Next to the bank",
            "New York",
            "New York",
            "122343404",
        );

        const product1 = new InvoiceItemsEntity({
            id: "1",
            name: "Product 1",
            price: 50,
        });

        const product2 = new InvoiceItemsEntity({
            id: "2",
            name: "Product 2",
            price: 60,
        })

        const invoice = new InvoiceEntity({
            id: new Id("123"),
            name: "Invoice 1",
            document: "Document 1",
            items: [product1, product2],
            address: address,
        });

        const invoiceRepository = new InvoiceRepository();

        const result = await invoiceRepository.add(invoice);

        expect(result.id).toEqual(invoice.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.items[0].name).toEqual(invoice.items[0].name);
        expect(result.items[1].name).toEqual(invoice.items[1].name);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.items[1].price).toEqual(invoice.items[1].price);
        expect(result.address).toEqual(invoice.address);
        expect(invoice.total).toEqual(110);
        expect(result.total).toEqual(invoice.total);
    });

    it("should find an invoice", async () => {
        const invoiceCreated = await InvoiceModel.create({
            id: "321",
            name: "Invoice 2",
            document: "Document 2",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [
                {
                    id: new Id("1"),
                    name: "Product 1",
                    price: 100,
                },
                {
                    id: new Id("2"),
                    name: "Product 2",
                    price: 200,
                },
            ],
            address: {
                street: "street",
                number: "number",
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode",
            }
        });

        const invoiceRepository = new InvoiceRepository();

        const result = await invoiceRepository.find("321");

        expect(result.id.id).toEqual(invoiceCreated.id);
        expect(result.name).toEqual(invoiceCreated.name);
        expect(result.document).toEqual(invoiceCreated.document);
        expect(result.items[0].name).toEqual(invoiceCreated.items[0].name);
        expect(result.items[1].name).toEqual(invoiceCreated.items[1].name);
        expect(result.items[1].price).toEqual(invoiceCreated.items[1].price);
        expect(result.items[0].price).toEqual(invoiceCreated.items[0].price);
        expect(result.total).toEqual(300);
    });
});