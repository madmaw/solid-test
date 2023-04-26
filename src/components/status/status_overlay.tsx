import { JSXElement } from 'solid-js';
import styles from './status_overlay.module.scss';
import { SymbolYouthComponent } from 'components/symbol/symbol';

export function StatusOverlayComponent(props: {
  health: JSXElement,
  age: JSXElement,
  narration: JSXElement,
}) {
  return (
    <div class={styles.overlay}>
      <div class={styles['status-bar']}>
        <div class={styles['health-container']}>
          {props.health}
        </div>
        <div class={styles['age-symbol']}>
          <SymbolYouthComponent fill="transparent" stroke="white"/>
        </div>
        <div class={styles['age-container']}>
          {props.age}
        </div>
      </div>
      <div class={styles.narration}>
        {props.narration}
      </div>
    </div>
  )
}