import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { OrderModel } from "../modules/checkout/repository/order.model";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import { ProductModel as AdmProductModel } from "../modules/product-adm/repository/product.model";


import TransactionModel from "../modules/payment/repository/transaction.model";
import {productsRoute} from "./routes/product/product.route";
import {clientsRoute} from "./routes/client/client.route";
import {checkoutRoute} from "./routes/checkout/checkout.route";
import {invoicesRoute} from "./routes/invoice/invoice.route";
import {Umzug} from "umzug";

export const app: Express = express();
app.use(express.json());

app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoicesRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;


async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    OrderModel,
    ClientModel,
    InvoiceModel,
    TransactionModel,
    StoreCatalogProductModel,
    AdmProductModel,
  ]);

  await sequelize.sync({force: true});
}

setupDb();
