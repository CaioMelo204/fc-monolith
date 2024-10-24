import {app, migration, sequelize} from "../../express";
import request from "supertest";
import Address from "../../../modules/@shared/domain/value-object/address";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close()
  });

  it("should create a client", async () => {
    const input = {
      id: "1",
      name: "john doe",
      email: "john.doe@email.com",
      document: "215251",
      address: {
        street: "street",
        number: "number",
        complement: 'complement',
        zipCode: 'zipCode',
        city: 'city',
        state: 'state'
      }

    }

    const response = await request(app).post("/clients").send(input);

    expect(response.status).toEqual(201);
  });

  it("should not create a client when name is not provided", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      email: "john.doe@email.com",
      document: "215251",
      address: new Address(
          "Rua 123",
          "99",
          "Casa Verde",
          "Criciúma",
          "SC",
          "88888-888",
      ),
    });

    expect(response.status).toEqual(400);
  });
});
