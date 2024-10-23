import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type invoiceItemsProps = {
    id?: string;
    price: number;
    name: string;
}

export class InvoiceItemsEntity extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(props: invoiceItemsProps) {
        super(new Id(props.id));
        this._name = props.name;
        this._price = props.price;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    set name(name: string) {
        this._name = name;
    }
}