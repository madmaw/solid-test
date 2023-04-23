import { ParentProps } from "solid-js";
import styles from './encounter_event.module.scss';

export function EncounterEventComponent(props: ParentProps) {
  return (
    <div class={styles.container}>
      {props.children}
    </div>
  )
}
