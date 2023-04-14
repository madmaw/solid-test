import styles from './card_slot.module.scss';
import { For, JSX, ParentProps, children } from "solid-js";

export function CardSlotComponent(props: ParentProps<{
  targetCard: JSX.Element,
}>) {
  return (
    <div class={styles.container}>
      <div class={styles['target-card']}>
        {props.targetCard}
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
