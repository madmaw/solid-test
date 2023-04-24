import { JSXElement } from 'solid-js';
import styles from './status_overlay.module.scss';

export function StatusOverlayComponent(props: {
  health: JSXElement,
  narration: JSXElement,
}) {
  return (
    <div class={styles.overlay}>
      <div class={styles['status-bar']}>
        <div class={styles['health-container']}>
          {props.health}
        </div>
      </div>
      <div class={styles.narration}>
        {props.narration}
      </div>
    </div>
  )
}