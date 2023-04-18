import { Entity } from "model/domain";
import { StatusOverlayComponent } from "./status_overlay";

export function createStatusOverlay() {
  return function(props: {
    playerCharacter: Entity,
  }) {
    return (
      <StatusOverlayComponent
          health={props.playerCharacter.health}
          maxHealth={props.playerCharacter.maxHealth}
      />
    );
  };
}