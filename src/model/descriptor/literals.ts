import { Component } from "solid-js";
import { TypeDescriptor } from "./types";

export class LiteralTypeDescriptor<LiteralType> implements TypeDescriptor<LiteralType, LiteralType> {

  constructor() { }

  aState!: LiteralType;

  aMutable!: LiteralType;

  create(s: LiteralType): LiteralType {
    return s;
  }

  snapshot(m: LiteralType): LiteralType {
    return m;
  }

  freeze(s: LiteralType): LiteralType {
    return s;
  }
}


export const numberDescriptor = new LiteralTypeDescriptor<number>();

export const stringDescriptor = new LiteralTypeDescriptor<string>();

export const booleanDescriptor = new LiteralTypeDescriptor<boolean>();

export const componentDescriptor = new LiteralTypeDescriptor<Component>();
