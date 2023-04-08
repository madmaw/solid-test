import { TypeDescriptor } from "./types";

class LiteralTypeDescriptor<LiteralType> implements TypeDescriptor<LiteralType, LiteralType> {

    constructor() {}

    aState!: LiteralType;

    aMutable!: LiteralType;

    create(s: LiteralType):  LiteralType {
        return s;
    }

    snapshot(m: LiteralType): LiteralType {
        return m;
    }
}


export const numberDescriptor = new LiteralTypeDescriptor<number>();

export const stringDescriptor = new LiteralTypeDescriptor<string>();

export const booleanDescriptor = new LiteralTypeDescriptor<boolean>();
