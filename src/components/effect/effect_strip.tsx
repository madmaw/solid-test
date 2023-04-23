import styles from './effect_strip.module.scss';
import { For } from "solid-js";
import { EffectComponent } from "./effect";
import { EffectUsage } from "rules/cards";

export function EffectStripComponent(props: {
  effects?: readonly EffectUsage[],
  warnUnused: boolean,
}) {
  return (
    <div class={styles.container}>
      <For each={props.effects}>
        {effect => (
            <EffectComponent
                effect={effect.effect}
                used={effect.used}
                warning={props.warnUnused}/>
        )}
      </For>
    </div>
  );
}