import { Effect, EffectDirection, SymbolType } from "model/domain";
import styles from './effect.module.scss';
import {
  SymbolComponent,
} from "components/symbol/symbol";

const resourceColors: Record<SymbolType, string> = {
  [SymbolType.Force]: styles.fillForce,
  [SymbolType.Finesse]: styles.fillFinesse,
  [SymbolType.Mind]: styles.fillMind,
  [SymbolType.Magic]: styles.fill,
  [SymbolType.Damage]: styles.fillDamage,
  [SymbolType.Age]: styles.fill,
  [SymbolType.Fire]: styles.fill,
  [SymbolType.Draw]: styles.fill,
  [SymbolType.Poison]: styles.fill,
  [SymbolType.Healing]: styles.fill,

};

export function EffectComponent(props: {
  effect: Effect,
  used: boolean,
  warning: boolean,
}) {
  return (
    <div classList={{
      [styles.container]: true,
      [styles.down]: props.effect.direction === EffectDirection.Down,
      [styles.unused]: !props.used,
      [styles.warning]: props.warning,
    }}>
      <SymbolComponent
          type={props.effect.symbol}
          fill={props.used ? styles.fill : resourceColors[props.effect.symbol]}
          stroke={styles.stroke}/>
    </div>
  );
}
