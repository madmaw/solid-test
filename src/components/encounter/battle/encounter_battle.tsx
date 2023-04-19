import { EncounterBattle } from "model/domain";
import { ParentProps } from "solid-js";
import styles from './encounter_battle.module.scss';

export function EncounterBattleComponent(props: ParentProps<{ model: EncounterBattle }>) {
  return (
    <div class={styles.container}>
      {props.children}
    </div>
  )
}
