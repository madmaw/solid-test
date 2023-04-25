import { EncounterEvent, EventType } from "model/domain";
import { ComponentManager } from "components/component_manager";
import { createFountainEntity } from "components/entity/fountain/create";
import { UnreachableError } from "base/unreachable_error";
import { EncounterEventComponent } from "./encounter_event";
import { createMagicTreeEntity } from "components/entity/magic_tree/create";
import { createMushroomEntity } from "components/entity/mushroom/create";
import { createShrineEntity } from "components/entity/shrine/create";
import { createTreasureEntity } from "components/entity/treasure/create";
import { createShopEntity } from "components/entity/shop/create";

function createEncounterEntity(encounter: EncounterEvent) {
  switch (encounter.eventType) {
    case EventType.Fountain:
      return createFountainEntity();
    case EventType.MagicTree:
      return createMagicTreeEntity();
    case EventType.Mushroom:
      return createMushroomEntity();
    case EventType.Shrine:
      return createShrineEntity();
    case EventType.Treasure:
      return createTreasureEntity();
    case EventType.Shop:
      return createShopEntity();
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

