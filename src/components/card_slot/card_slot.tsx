import styles from './card_slot.module.scss';
import { Component, For, ParentProps, children } from "solid-js";

export function CardSlotComponent(props: ParentProps<{
  TargetCard: Component | undefined,
}>) {
  return (
    <div class={styles.container}>
      <div class={styles['target-card']}>
        {props.TargetCard && <props.TargetCard/>}
      </div>
      <div class={styles['played-cards']}>
        <For each={children(() => props.children).toArray()}>
          {child => (
            <div class={styles['played-card']}>{child}</div>
          )}
        </For>
      </div>
    </div>
  );
}
