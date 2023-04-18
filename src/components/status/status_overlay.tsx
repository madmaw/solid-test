import { Index } from 'solid-js';
import styles from './status_overlay.module.scss';

export function StatusOverlayComponent(props: {
  health: number,
  maxHealth: number,
}) {
  return (
    <div class={styles.overlay}>
      <div class={styles['status-bar']}>
        <div class={styles['health-container']}>
          <Index each={new Array(props.maxHealth).fill(0)}>
            {(_, index) => (
              <div classList={{
                [styles.health]: true,
                [styles.filled]: index < props.health,
              }}/>
            )}
          </Index>
        </div>
      </div>
    </div>
  )
}