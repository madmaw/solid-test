import { Effect, EffectDirection, SymbolType } from "model/domain";
import styles from './effect.module.scss';
import { Component } from "solid-js";
import { SymbolDamageComponent, SymbolFinesseComponent, SymbolForceComponent, SymbolMindComponent } from "./symbol/symbols";
import { Dynamic } from "solid-js/web";

const ResourceSymbols: Record<SymbolType, Component<{ used: boolean }>> = {
  [SymbolType.Force]: props => <SymbolForceComponent
      fill={props.used ? styles.fill : styles.fillForce}
      stroke={styles.stroke}/>,
  [SymbolType.Finesse]: props => <SymbolFinesseComponent
      fill={props.used ? styles.fill : styles.fillFinesse}
      stroke={styles.stroke}/>,
  [SymbolType.Mind]: props => <SymbolMindComponent
      fill={props.used ? styles.fill : styles.fillMind}
      stroke={styles.stroke}/>,
  [SymbolType.Magic]: () => <>{'R'}</>,
  [SymbolType.Damage]: props => <SymbolDamageComponent
      fill={props.used ? styles.fill : styles.fillDamage}
      stroke={styles.stroke}/>,
  [SymbolType.Age]: () => <>{'Q'}</>,
  [SymbolType.Fire]: () => <>{'M'}</>,
  [SymbolType.Draw]: () => <>{'G'}</>,
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
      <Dynamic
          component={ResourceSymbols[props.effect.symbol]}
          used={props.used}/>
    </div>
  );
}
