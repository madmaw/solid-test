import { Effect, EffectDirection, SymbolType } from "model/domain";
import styles from './effect.module.scss';

const ResourceSymbols: Record<SymbolType, string> = {
  [SymbolType.Force]: 'A',
  [SymbolType.Finesse]: 'P',
  [SymbolType.Magic]: 'V',
  [SymbolType.Damage]: 'W',
  [SymbolType.Age]: 'Q',
  [SymbolType.Fire]: 'M',
  [SymbolType.Draw]: 'G',
};

export function EffectComponent(props: {
  effect: Effect,
  used: boolean,
}) {
  return (
    <div classList={{
      [styles.container]: true,
      [styles.down]: props.effect.direction === EffectDirection.Down,
      [styles.used]: props.used,
    }}>
      {ResourceSymbols[props.effect.symbol]}
    </div>
  );
}
