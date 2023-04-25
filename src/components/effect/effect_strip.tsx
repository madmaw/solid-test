import styles from './effect_strip.module.scss';
import { For } from "solid-js";
import { EffectComponent } from "./effect";
import { EffectUsage } from "rules/cards";

export function EffectStripComponent(props: {
  usages?: readonly EffectUsage[],
  warnUnused: boolean,
}) {
  return (
    <div class={styles.container}>
      <For each={props.usages}>
        {usage => (
            <EffectComponent
                effect={usage.effect}
                used={usage.used}
                warning={props.warnUnused}/>
        )}
      </For>
    </div>
  );
}