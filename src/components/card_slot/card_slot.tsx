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
  bordered: boolean,
  onDragStart: () => void,
  onDrop: () => void,
  onClick: () => void,
  used: boolean,
  forceUnrotate: boolean,
}>) {
  return (
    <div
        class={styles.container}
        onPointerUp={props.onDrop}>
      <div
          classList={{ 
            [styles['target-card']]: true,
            [interactionStyles[props.targetInteraction]]: true,
            [styles.bordered]: props.bordered
          }}
          onPointerDown={props.onDragStart}
          onClick={props.onClick}>
        {props.targetCard}
      </div>
      <div classList={{
        [styles['played-cards']]: true,
        [styles.used]: props.used,
        [styles.unrotate]: props.forceUnrotate,
      }}>
        <For each={children(() => props.children).toArray()}>
          {child => (
            <div
                classList={{
                  [styles['played-card']]: true,
                  [styles.used]: props.used,
                }}
            >{child}</div>
          )}
        </For>
      </div>
    </div>
  );
}
