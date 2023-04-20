import { Index } from "solid-js";
import styles from './entity_health.module.scss';

export function EntityHealth(props: {
  maxHealth: number,
  health: number,
  small?: boolean,
}) {
  return (
    <div class={styles.container}>
      <Index each={new Array(props.maxHealth).fill(0)}>
        {(_, index) => (
          <div classList={{
            [styles.health]: true,
            [styles.small]: props.small,
            [styles.filled]: index < props.health,
          }}/>
        )}
      </Index>
    </div>
  );
}
