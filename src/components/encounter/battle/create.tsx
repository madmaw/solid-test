import { createMonster } from "components/entity/create";
import { EncounterBattle } from "model/domain";
import { EncounterBattleComponent } from "./encounter_battle";
import { ComponentManager } from "components/component_manager";

export function createEncounterBattleManger() {
  function createEncounterBattle(encounter: EncounterBattle) {
    const {
      controller,
      Component: MonsterComponent,
    } = createMonster(encounter.monsterType);
  
    function Component() {
      return (
        <EncounterBattleComponent model={encounter}>
          <MonsterComponent/>
        </EncounterBattleComponent>
      );
    }
  
    return {
      Component,
      // TODO might want a way to animate the health in and out
      controller,
    }
  }
  
  const encounterBattleManger = new ComponentManager(createEncounterBattle);
  return encounterBattleManger;
  
}

