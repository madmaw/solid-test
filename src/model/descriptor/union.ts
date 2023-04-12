import { TypeDescriptor } from "./types";

type Types = { [k: string]: TypeDescriptor };

type OneStateOf<C extends Types> = C[keyof C]['aState'];
type OneMutableOf<C extends Types> = C[keyof C]['aMutable'];

class DiscriminatingUnionTypeDescriptor<C extends Types> implements TypeDescriptor<OneStateOf<C>, OneMutableOf<C>> {
  constructor(
    private readonly cases: C,
    private readonly discriminatorState: (s: OneStateOf<C>) => keyof C,
    private readonly discriminatorMutable: (m: OneMutableOf<C>) => keyof C,
  ) {
  }

  aState!: OneStateOf<C>;

  aMutable!: OneMutableOf<C>;

  create(s: OneStateOf<C>): OneMutableOf<C> {
    const type = this.discriminatorState(s);
    return this.cases[type].create(s);
  }

  snapshot(m: OneMutableOf<C>): OneStateOf<C> {
    const type = this.discriminatorMutable(m);
    return this.cases[type].snapshot(m);
  }
}

export function discriminatingUnionDescriptor<C extends Types>(
  cases: C,
  discriminatorState: (s: OneStateOf<C>) => keyof C,
  discriminatorMutable: (m: OneMutableOf<C>) => keyof C,
) {
  return new DiscriminatingUnionTypeDescriptor(cases, discriminatorState, discriminatorMutable);
}
