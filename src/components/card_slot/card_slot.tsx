import { Interaction } from 'rules/interaction_manager';
import styles from './card_slot.module.scss';
import { For, JSX, ParentProps, children } from "solid-js";

const interactionStyles: Record<Interaction, string> = Object.freeze({
  [Interaction.None]: styles.none,
  [Interaction.Drag]: styles.draggable,
  [Interaction.Activate]: styles.clickable,
  [Interaction.Disabled]: styles.immovable,
  [Interaction.NoDrop]: styles['no-drop'],
  [Interaction.Drop]: styles.drop,
  [Interaction.Dragging]: styles.dragging,
  [Interaction.LongPress]: styles['long-press'],
});

export function CardSlotComponent(props: ParentProps<{
  targetCard: JSX.Element,
  targetInteraction: Interaction,
  onDragStart: () => void,
  onDrop: () => void,
}>) {
  return (
    <div
        class={styles.container}
        onMouseUp={props.onDrop}>
      <div
          classList={{ 
            [styles['target-card']]: true,
            [interactionStyles[props.targetInteraction]]: true,
          }}
          onMouseDown={props.onDragStart}>
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
