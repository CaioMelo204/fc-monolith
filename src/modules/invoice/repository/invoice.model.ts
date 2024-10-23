import {Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

interface Items {
    id: string;
    name: string;
    price: number;
}

interface Address {
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
}

@Table({
    tableName: 'invoices',
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;

    @Column({ allowNull: false, type: DataType.JSON })
    address: Address

    @Column({ allowNull: false, type: DataType.JSON })
    items: Items[]
}