export interface TypeDescriptor<StateType = any, MutableType = any> {
  aState: StateType;

  aMutable: MutableType;

  create(s: StateType): MutableType;

  snapshot(m: MutableType): StateType;

  freeze(s: StateType): StateType;
};

export type TypeDescriptors = {
  [_: string]: TypeDescriptor,
};
