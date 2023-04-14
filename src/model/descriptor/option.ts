import { TypeDescriptor } from "./types";

type OptionalState<MandatoryTypeDescriptor extends TypeDescriptor> =
  MandatoryTypeDescriptor['aState'] | undefined;

type OptionalMutable<MandatoryTypeDescriptor extends TypeDescriptor> =
  MandatoryTypeDescriptor['aMutable'] | undefined;

class OptionalTypeDescriptor<MandatoryTypeDescriptor extends TypeDescriptor>
  implements TypeDescriptor<OptionalState<MandatoryTypeDescriptor>, OptionalMutable<MandatoryTypeDescriptor>> {
  constructor(private readonly mandatoryTypeDescriptor: MandatoryTypeDescriptor) { }

  aState!: MandatoryTypeDescriptor['aState'] | undefined;

  aMutable!: MandatoryTypeDescriptor['aMutable'] | undefined;

  create(s: OptionalState<MandatoryTypeDescriptor>): OptionalMutable<MandatoryTypeDescriptor> {
    return s != null ? this.mandatoryTypeDescriptor.create(s) : undefined;
  }

  snapshot(m: OptionalMutable<MandatoryTypeDescriptor>): OptionalState<MandatoryTypeDescriptor> {
    return m != null ? this.mandatoryTypeDescriptor.snapshot(m) : undefined;
  }

  freeze(s: OptionalState<MandatoryTypeDescriptor>): OptionalState<MandatoryTypeDescriptor> {
    return s != null ? this.mandatoryTypeDescriptor.freeze(s) : undefined;
  }
}

export function optionalDescriptor<MandatoryTypeDescriptor extends TypeDescriptor>(
  mandatoryTypeDescriptor: MandatoryTypeDescriptor,
) {
  return new OptionalTypeDescriptor(mandatoryTypeDescriptor);
}
