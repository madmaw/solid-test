import { EffectDirection, SymbolType, effectDescriptor } from "model/domain";

export const ForceUp = effectDescriptor.create({
  direction: EffectDirection.Up,
  symbol: SymbolType.Force,
});

export const ForceDown = effectDescriptor.create({
  direction: EffectDirection.Down,
  symbol: SymbolType.Force,
});

export const FinesseUp = effectDescriptor.create({
  direction: EffectDirection.Up,
  symbol: SymbolType.Finesse,
});

export const FinesseDown = effectDescriptor.create({
  direction: EffectDirection.Down,
  symbol: SymbolType.Finesse,
});

export const MagicUp = effectDescriptor.create({
  direction: EffectDirection.Up,
  symbol: SymbolType.Magic,
});

export const MagicDown = effectDescriptor.create({
  direction: EffectDirection.Down,
  symbol: SymbolType.Magic,
});

export const DamageUp = effectDescriptor.create({
  direction: EffectDirection.Up,
  symbol: SymbolType.Damage,
});

export const DamageDown = effectDescriptor.create({
  direction: EffectDirection.Down,
  symbol: SymbolType.Damage,
});

export const FireUp = effectDescriptor.create({
  direction: EffectDirection.Up,
  symbol: SymbolType.Fire,
});

export const FireDown = effectDescriptor.create({
  direction: EffectDirection.Down,
  symbol: SymbolType.Fire,
});

export const AgeUp = effectDescriptor.create({
  direction: EffectDirection.Up,
  symbol: SymbolType.Age,
});

export const AgeDown = effectDescriptor.create({
  direction: EffectDirection.Down,
  symbol: SymbolType.Age,
});

