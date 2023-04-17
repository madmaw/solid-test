import { Effect } from "model/domain";
import styles from './effect_strip.module.scss';
import { For } from "solid-js";
import { EffectComponent } from "./effect";

export function EffectStripComponent(props: {
  effects?: readonly Effect[],
}) {
  return (
    <div class={styles.container}>
      <For each={props.effects}>
        {effect => (<EffectComponent effect={effect}/>)}
      </For>
    </div>
  );
}