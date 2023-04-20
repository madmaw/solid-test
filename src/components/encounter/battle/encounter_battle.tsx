import { EncounterBattle } from "model/domain";
import { ParentProps } from "solid-js";
import styles from './encounter_battle.module.scss';
import { EntityHealth } from "components/entity/health/entity_health";

export function EncounterBattleComponent(props: ParentProps<{ model: EncounterBattle }>) {
  return (
    <div class={styles.container}>
      <EntityHealth
          health={props.model.monster.health}
          maxHealth={props.model.monster.maxHealth}
          small={true}/>
      {props.children}
    </div>
  )
}
