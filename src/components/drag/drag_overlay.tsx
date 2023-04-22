import { Component, ParentProps } from 'solid-js';
import styles from './drag_overlay.module.scss';

export function DragOverlay(props: ParentProps<{
  cx: number | undefined,
  cy: number | undefined,
  Card: Component,
  dragging: boolean,
  onDragCancel: () => void,
}>) {
  return (
    <div
        classList={{
          [styles.drag]: true,
          [styles.dragging]: props.dragging
        }}
        onPointerUp={props.onDragCancel}
    >
      {props.children}
      <div
          class={styles['scale-up']}
          style={
            props.cx != null && props.cy != null
                ? {
                  transform: `translate(${props.cx}px, ${props.cy}px)`
                }
                : undefined
          }>
        <props.Card/> 
      </div>
    </div>
  )
}
