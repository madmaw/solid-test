import { createSignal, Signal } from "solid-js";
import { TypeDescriptor } from "./types";

type SignalState<
  ReferencedTypeDescriptor extends TypeDescriptor,
> = ReferencedTypeDescriptor['aState'];

type SignalMutable<
  ReferencedTypeDescriptor extends TypeDescriptor,
> = Signal<ReferencedTypeDescriptor['aMutable']>;


class SignalTypeDescriptor<ReferencedTypeDescriptor extends TypeDescriptor>
  implements TypeDescriptor<SignalState<ReferencedTypeDescriptor>, SignalMutable<ReferencedTypeDescriptor>> {
  constructor(private readonly referencedTypeDescriptor: ReferencedTypeDescriptor) { }

  aState!: SignalState<ReferencedTypeDescriptor>;

  aMutable!: SignalMutable<ReferencedTypeDescriptor>;

  create(s: SignalState<ReferencedTypeDescriptor>): SignalMutable<ReferencedTypeDescriptor> {
    return createSignal(this.referencedTypeDescriptor.create(s));
  }

  snapshot([getter]: SignalMutable<ReferencedTypeDescriptor>): SignalState<ReferencedTypeDescriptor> {
    return this.referencedTypeDescriptor.snapshot(getter());
  }
}

export function signalDescriptor<T extends TypeDescriptor>(referencedTypeDescriptor: T) {
  return new SignalTypeDescriptor(referencedTypeDescriptor);
}
