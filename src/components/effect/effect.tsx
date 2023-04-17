import { Effect, EffectDirection, SymbolType } from "model/domain";
import styles from './effect.module.scss';

const ResourceSymbols: Record<SymbolType, string> = {
  [SymbolType.Force]: 'A',
  [SymbolType.Finesse]: 'B',
  [SymbolType.Magic]: 'C',
  [SymbolType.Damage]: 'D',
  [SymbolType.Age]: 'E',
  [SymbolType.Fire]: 'F',
  [SymbolType.Draw]: 'G',
};

export function EffectComponent(props: {
  effect: Effect,
}) {
  return (
    <div classList={{
      [styles.container]: true,
      [styles.down]: props.effect.direction === EffectDirection.Down,
    }}>
      {ResourceSymbols[props.effect.symbol]}
    </div>
  );
}
