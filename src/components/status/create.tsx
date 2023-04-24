import { Entity } from "model/domain";
import { StatusOverlayComponent } from "./status_overlay";
import { EntityHealth } from "components/entity/health/entity_health";
import { NarrationComponent } from "components/narration/narration";
import { RenderingSpeaker } from "ui/speaker/rendering_speaker";
import { createMemo } from "solid-js";

export function createStatusOverlay() {
  return function(props: {
    playerCharacter: Entity,
    speaker: RenderingSpeaker,
  }) {
    const health = (
        <EntityHealth
            health={props.playerCharacter.health}
            maxHealth={props.playerCharacter.maxHealth}/>
    );
    const words = createMemo(() => {
      return props.speaker.text?.split(' ') || [];
    });
    const index = createMemo(() => {
      const text = props.speaker.text || '';
      const spoken = text.substring(0, props.speaker.characterIndex);      
      return Math.min(spoken.length, spoken.split(' ').length);
    });
    const narration = (
        <NarrationComponent
            words={words()}
            index={index()}/>
    );
    return (
      <StatusOverlayComponent
          health={health}
          narration={narration}
      />
    );
  };
}