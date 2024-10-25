import { app, sequelize } from "../../express";
import request from "supertest";
import Address from "../../../modules/@shared/domain/value-object/address";
import {InvoiceItemsEntity} from "../../../modules/invoice/domain/invoice-items.entity";
import {InvoiceEntity} from "../../../modules/invoice/domain/invoice.entity";
import {InvoiceRepository} from "../../../modules/invoice/repository/invoice.repository";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";


describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the invoice", async () => {
    const address = new Address(
      "Main Street",
      "123",
      "Next to the bank",
      "New York",
      "state",
      "123456789",
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
    });

    const invoice = new InvoiceEntity({
      id: new Id("123"),
      name: "Invoice 1",
      document: "Document 1",
      items: [product1, product2],
      address: address,
    });

    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.add(invoice);
    const response = await request(app).get(`/invoice/${123}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Invoice 1");
  });
});
