import { Effect, EffectDirection, SymbolType } from "model/domain";

export const ForceUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Force,
};

export const ForceDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Force,
};

export const FinesseUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Finesse,
};

export const FinesseDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Finesse,
};

export const MagicUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Magic,
};

export const MagicDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Magic,
};

export const DamageUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Damage,
};

export const DamageDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Damage,
};

export const FireUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Fire,
};

export const FireDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Fire,
};

export const AgeUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Age,
};

export const AgeDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Age,
};
