import { Component } from 'solid-js';
import styles from './drag_overlay.module.scss';

export function DragOverlay(props: {
  cx: number,
  cy: number,
  Card: Component,
}) {
  return (
    <div class={styles.drag} style={{
      transform: `translate(${props.cx}px, ${props.cy}px)`
    }}>
      <div class={styles['scale-up']}>
        <props.Card/> 
      </div>
    </div>
  )
}