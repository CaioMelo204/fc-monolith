import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import {InvoiceItemsEntity} from "./invoice-items.entity";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string
    address: Address
    items: InvoiceItemsEntity[]
}

export class InvoiceEntity extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address
    private _items: InvoiceItemsEntity[]

    constructor(props: InvoiceProps) {
        super(props.id)
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items;
    }

    get name() {
        return this._name
    }

    get document() {
        return this._document
    }

    get address() {
        return this._address
    }

    get items() {
        return this._items
    }

    get total() {
        let total = 0;
        this._items.forEach((item) => {
            total = total + item.price;
        });

        return total;
    }
}