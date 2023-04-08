import { Signal } from "solid-js";
import { TypeDescriptor, TypeDescriptors } from "./types";

type ActiveRecordState<
    AttributeTypeDescriptors extends TypeDescriptors,
> = { [K in keyof AttributeTypeDescriptors]: AttributeTypeDescriptors[K]['aState'] };

type ActiveRecordMutable<
    AttributeTypeDescriptors extends TypeDescriptors,
> = { [K in keyof AttributeTypeDescriptors]: AttributeTypeDescriptors[K]['aMutable'] };

type ActiveRecordTarget<
    AttributeTypeDescriptors extends TypeDescriptors
> = { [K in keyof AttributeTypeDescriptors]: Signal<AttributeTypeDescriptors[K]['aMutable']> };

class ActiveRecordProxyHandler<AttributeTypeDescriptors extends TypeDescriptors>
        implements ProxyHandler<ActiveRecordTarget<AttributeTypeDescriptors>> {
    constructor() {

    }

    get(target: ActiveRecordTarget<AttributeTypeDescriptors>, p: string) {
        return target[p]?.[0]?.();
    }

    set(target: ActiveRecordTarget<AttributeTypeDescriptors>, p: string, newValue: any, receiver: any): boolean {
        const signal = target[p]?.[1];
        signal?.(newValue);
        return signal != null;
    }
}

class ActiveRecordTypeDescriptor<AttributeTypeDescriptors extends TypeDescriptors>
        implements TypeDescriptor<ActiveRecordState<AttributeTypeDescriptors>, ActiveRecordMutable<AttributeTypeDescriptors>> {
    constructor(private readonly attributeTypes: AttributeTypeDescriptors) {}

    aState!: ActiveRecordState<AttributeTypeDescriptors>;

    aMutable!: ActiveRecordMutable<AttributeTypeDescriptors>;

    create(s: ActiveRecordState<AttributeTypeDescriptors>): ActiveRecordMutable<AttributeTypeDescriptors> {

        const target: ActiveRecordTarget<AttributeTypeDescriptors> = {} as any;
        for (let key in this.attributeTypes) {
            const attributeType = this.attributeTypes[key];
            const value = s[key];
            const valueMutable = attributeType.create(value);
            target[key] = valueMutable;
        }
        return new Proxy(target, new ActiveRecordProxyHandler());
    }

    snapshot(m: ActiveRecordMutable<AttributeTypeDescriptors>): ActiveRecordState<AttributeTypeDescriptors> {
        const snapshot: ActiveRecordState<AttributeTypeDescriptors> = {} as any;
        for (let key in this.attributeTypes) {
            const attributeType = this.attributeTypes[key];
            const value = m[key];
            const valueMutable = attributeType.snapshot(value);
            snapshot[key] = valueMutable;
        }
        return snapshot;
    }
}

export function activeRecordDescriptor<AttributeTypeDescriptors extends TypeDescriptors>(
        attributeTypes: AttributeTypeDescriptors,
) {
    return new ActiveRecordTypeDescriptor(attributeTypes);
}