import { Component, For } from 'solid-js';
import styles from './card_slots.module.scss';
import { CardSlot } from 'model/domain';

export function CardSlotsComponent(props: {
  cardSlots: readonly CardSlot[],
  CardSlotComponent: Component<{ model: CardSlot }>,
}) {
  return (
    <div class={styles.container}>
      <For each={props.cardSlots}>
        {cardSlot => (
          <props.CardSlotComponent model={cardSlot}/>
        )}
      </For>
    </div>
  );
}
