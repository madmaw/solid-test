import { EncounterEvent, EventType } from "model/domain";
import { ComponentManager } from "components/component_manager";
import { createFountainEntity } from "components/entity/fountain/create";
import { UnreachableError } from "base/unreachable_error";
import { EncounterEventComponent } from "./encounter_event";

function createEncounterEntity(encounter: EncounterEvent) {
  switch (encounter.eventType) {
    case EventType.Fountain:
      return createFountainEntity();
    default:
      throw new UnreachableError(encounter.eventType);
  }
}

export function createEncounterEventManger() {
  function createEncounterEvent(encounter: EncounterEvent) {
    const { Component: EntityComponent, controller } = createEncounterEntity(encounter);
    function Component() {
      return (
          <EncounterEventComponent>
            <EntityComponent/>
          </EncounterEventComponent>
      );
    };
    return {
      Component,
      controller,
    }
  }
  const encounterEventManger = new ComponentManager(createEncounterEvent);
  return encounterEventManger;
}

