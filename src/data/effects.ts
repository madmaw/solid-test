import { EffectDirection, SymbolType, effectDescriptor } from "model/domain";

export const ForceUp = effectDescriptor.freeze({
  direction: EffectDirection.Up,
  symbol: SymbolType.Force,
});

export const ForceDown = effectDescriptor.freeze({
  direction: EffectDirection.Down,
  symbol: SymbolType.Force,
});

export const FinesseUp = effectDescriptor.freeze({
  direction: EffectDirection.Up,
  symbol: SymbolType.Finesse,
});

export const FinesseDown = effectDescriptor.freeze({
  direction: EffectDirection.Down,
  symbol: SymbolType.Finesse,
});

export const MagicUp = effectDescriptor.freeze({
  direction: EffectDirection.Up,
  symbol: SymbolType.Magic,
});

export const MagicDown = effectDescriptor.freeze({
  direction: EffectDirection.Down,
  symbol: SymbolType.Magic,
});

export const DamageUp = effectDescriptor.freeze({
  direction: EffectDirection.Up,
  symbol: SymbolType.Damage,
});

export const DamageDown = effectDescriptor.freeze({
  direction: EffectDirection.Down,
  symbol: SymbolType.Damage,
});

export const FireUp = effectDescriptor.freeze({
  direction: EffectDirection.Up,
  symbol: SymbolType.Fire,
});

export const FireDown = effectDescriptor.freeze({
  direction: EffectDirection.Down,
  symbol: SymbolType.Fire,
});

export const AgeUp = effectDescriptor.freeze({
  direction: EffectDirection.Up,
  symbol: SymbolType.Age,
});

export const AgeDown = effectDescriptor.freeze({
  direction: EffectDirection.Down,
  symbol: SymbolType.Age,
});

