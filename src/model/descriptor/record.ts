import { createSignal, Signal } from "solid-js";
import { TypeDescriptor, TypeDescriptors } from "./types";

type Mutable = {
  __aMutable: true,
};

type State = {
  __aMutable?: never,
};


type RecordState<
  Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aState'] } & State;

type RecordMutable<
  Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aMutable'] } & Mutable;


type RecordStateWithNoMutables<
  Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aState'] & State };


class ValueRecordTypeDescriptor<AttributeTypeDescriptors extends TypeDescriptors>
  implements TypeDescriptor<RecordState<AttributeTypeDescriptors>, RecordMutable<AttributeTypeDescriptors>> {
  constructor(private readonly attributeTypes: AttributeTypeDescriptors) { }

  aState!: Readonly<RecordState<AttributeTypeDescriptors>>;

  aMutable!: Readonly<RecordMutable<AttributeTypeDescriptors>>;

  create(s: RecordStateWithNoMutables<AttributeTypeDescriptors>): RecordMutable<AttributeTypeDescriptors> {
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

  freeze(s: RecordState<AttributeTypeDescriptors>): RecordState<AttributeTypeDescriptors> {
    const snapshot: RecordState<AttributeTypeDescriptors> = {} as any;
    for (let key in this.attributeTypes) {
      const attributeType = this.attributeTypes[key];
      const value = s[key];
      const valueMutable = attributeType.freeze(value);
      snapshot[key] = valueMutable;
    }
    return Object.freeze(snapshot);    
  }

}

export function valueRecordDescriptor<AttributeTypeDescriptors extends TypeDescriptors>(
  attributeTypes: AttributeTypeDescriptors,
) {
  return new ValueRecordTypeDescriptor(attributeTypes);
}

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

  set(target: ActiveRecordTarget<AttributeTypeDescriptors>, p: string, newValue: any): boolean {
    const signal = target[p]?.[1];
    signal?.(newValue);
    return signal != null;
  }
}

class ActiveRecordTypeDescriptor<AttributeTypeDescriptors extends TypeDescriptors>
  implements TypeDescriptor<RecordState<AttributeTypeDescriptors>, RecordMutable<AttributeTypeDescriptors>> {
  constructor(private readonly attributeTypes: AttributeTypeDescriptors) { }

  aState!: Readonly<RecordState<AttributeTypeDescriptors>>;

  aMutable!: RecordMutable<AttributeTypeDescriptors>;

  create(s: RecordState<AttributeTypeDescriptors>): RecordMutable<AttributeTypeDescriptors> {

    const target: ActiveRecordTarget<AttributeTypeDescriptors> = {} as any;
    for (let key in this.attributeTypes) {
      const attributeType = this.attributeTypes[key];
      const value = s[key];
      const valueMutable = attributeType.create(value);
      target[key] = createSignal(valueMutable);
    }
    return new Proxy(target, new ActiveRecordProxyHandler()) as RecordMutable<AttributeTypeDescriptors>;
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

  freeze(s: RecordState<AttributeTypeDescriptors>): RecordState<AttributeTypeDescriptors> {
    const snapshot: RecordState<AttributeTypeDescriptors> = {} as any;
    for (let key in this.attributeTypes) {
      const attributeType = this.attributeTypes[key];
      const value = s[key];
      const valueMutable = attributeType.snapshot(value);
      snapshot[key] = valueMutable;
    }
    return Object.freeze(snapshot);    
  }
}

export function activeRecordDescriptor<AttributeTypeDescriptors extends TypeDescriptors>(
  attributeTypes: AttributeTypeDescriptors,
) {
  return new ActiveRecordTypeDescriptor(attributeTypes);
}