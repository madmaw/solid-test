import { TypeDescriptor } from "./types";

type ListState<
    ElementTypeDescriptor extends TypeDescriptor,
> = readonly ElementTypeDescriptor['aState'][];

type ListMutable<
    ElementTypeDescriptor extends TypeDescriptor,
> = readonly ElementTypeDescriptor['aMutable'][];


class ListTypeDescriptor<ElementTypeDescriptor extends TypeDescriptor>
        implements TypeDescriptor<ListState<ElementTypeDescriptor>, ListMutable<ElementTypeDescriptor>> {

    constructor(private readonly elementTypeDescriptor: ElementTypeDescriptor) {}

    aState!: ListState<ElementTypeDescriptor>;

    aMutable!: ListMutable<ElementTypeDescriptor>;

    create(s: ListState<ElementTypeDescriptor>): ListMutable<ElementTypeDescriptor> {
        return s.map(v => this.elementTypeDescriptor.create(v));
    }

    snapshot(m: ListMutable<ElementTypeDescriptor>): ListState<ElementTypeDescriptor> {
        return m.map(v => this.elementTypeDescriptor.snapshot(v));
    }
}

export function listDescriptor<ElementTypeDescriptor extends TypeDescriptor,>(elementTypeDescriptor: ElementTypeDescriptor) {
    return new ListTypeDescriptor(elementTypeDescriptor);
}