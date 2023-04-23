import { Effect, EffectDirection, SymbolType } from "model/domain";

export const Force: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Force,
};

export const Finesse: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Finesse,
};

export const Mind: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Mind,
};

export const Magic: Effect = {
  direction: EffectDirection.Omni,
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

export const Healing: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Healing,
};

export const PoisonUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Poison,
};

export const PoisonDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Poison,
};
