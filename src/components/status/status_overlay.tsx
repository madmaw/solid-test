import { JSXElement } from 'solid-js';
import styles from './status_overlay.module.scss';

export function StatusOverlayComponent(props: {
  health: JSXElement,
}) {
  return (
    <div class={styles.overlay}>
      <div class={styles['status-bar']}>
        <div class={styles['health-container']}>
          {props.health}
        </div>
      </div>
    </div>
  )
}