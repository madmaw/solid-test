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

export const Perception: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Perception,
};

export const DamageUp: Effect = {
  direction: EffectDirection.Up,
  symbol: SymbolType.Damage,
};

export const DamageDown: Effect = {
  direction: EffectDirection.Down,
  symbol: SymbolType.Damage,
};

export const Youth: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Youth,
};

export const Age: Effect = {
  direction: EffectDirection.Omni,
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

export const GainMaxHealth: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.GainMaxHealth,
};

export const LoseMaxHealth: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.LoseMaxHealth,
};

export const LoseCards: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.LoseCards,
};

export const DoubleCard: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.DoubleCard,
};

export const Draw: Effect = {
  direction: EffectDirection.Omni,
  symbol: SymbolType.Draw,
};