import { Signal } from "solid-js";

export interface TypeDescriptor<StateType = any, MutableType = any> {
    aState: StateType;

    aMutable: MutableType;

    create(s: StateType): MutableType;
    
    snapshot(m: MutableType): StateType;
};

export type TypeDescriptors = {
    [_: string]: TypeDescriptor,
};
