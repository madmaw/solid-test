import { Entity } from "model/domain";
import { StatusOverlayComponent } from "./status_overlay";
import { EntityHealth } from "components/entity/health/entity_health";

export function createStatusOverlay() {
  return function(props: {
    playerCharacter: Entity,
  }) {
    const health = <EntityHealth health={props.playerCharacter.health} maxHealth={props.playerCharacter.maxHealth}/>;
    return (
      <StatusOverlayComponent
          health={health}
      />
    );
  };
}