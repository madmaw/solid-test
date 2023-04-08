import { Signal } from "solid-js";
import { TypeDescriptor, TypeDescriptors } from "./types";

type RecordState<
    Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aState'] };

type RecordMutable<
    Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aMutable'] };

export class RecordTypeDescriptor<AttributeTypeDescriptors extends TypeDescriptors>
        implements TypeDescriptor<RecordState<AttributeTypeDescriptors>, RecordMutable<AttributeTypeDescriptors>> {
    constructor(private readonly attributeTypes: AttributeTypeDescriptors) {}

    aState!: RecordState<AttributeTypeDescriptors>;

    aMutable!: RecordMutable<AttributeTypeDescriptors>;

    create(s: RecordState<AttributeTypeDescriptors>): RecordMutable<AttributeTypeDescriptors> {
        const mutable: RecordMutable<AttributeTypeDescriptors> = {} as any;
        for (let key in this.attributeTypes) {
            const attributeType = this.attributeTypes[key];
            const value = s[key];
            const valueMutable = attributeType.create(value);
            mutable[key] = valueMutable;
        }
        return mutable;
    }

    snapshot(m: RecordMutable<AttributeTypeDescriptors>): RecordState<AttributeTypeDescriptors> {
        const snapshot: RecordState<AttributeTypeDescriptors> = {} as any;
        for (let key in this.attributeTypes) {
            const attributeType = this.attributeTypes[key];
            const value = m[key];
            const valueMutable = attributeType.snapshot(value);
            snapshot[key] = valueMutable;
        }
        return snapshot;
    }
}
