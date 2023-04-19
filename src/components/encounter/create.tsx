import { ComponentManager } from "components/component_manager";
import { EntityController } from "components/entity/entity_controller";
import { Encounter, EncounterBattle, EncounterEvent, EncounterType } from "model/domain";
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";

type EncounterProps<T extends Encounter = Encounter> = {
  model: T,
}

export function createEncounter(
  battleComponentManager: ComponentManager<EncounterBattle, EntityController>,
  eventComponentManager: ComponentManager<EncounterEvent, {}>,
) {
  const encounterComponents: { [K in EncounterType]: Component<EncounterProps>} = {
    [EncounterType.Battle]: function (props: EncounterProps) {
      return <battleComponentManager.FactoryComponent
          model={props.model as EncounterBattle}/>;
    },
    [EncounterType.Event]: function (props: EncounterProps) {
      return <eventComponentManager.FactoryComponent
          model={props.model as EncounterEvent}/>;
    },
  }
  
  return function (props: EncounterProps) {
    return (
      <Dynamic
          component={encounterComponents[props.model.type]}
          model={props.model}/>
    )
  }  
}
