import { Card } from "model/domain";
import { Animations, CardController, FlipState, cardUIDescriptor } from "./card_controller";
import { AnimationManager } from "base/animation_manager";
import { CardComponent } from "./card";
import { CardFaceComponent } from "./card_face";

export function createCard({
  card,
}: {
  card: Card,
}) {
  const animations = new AnimationManager<Animations>();
  const cardUI = cardUIDescriptor.create({
    card,
    flipState: FlipState.Flat,
  });

  function Component() {
    return (
      <CardComponent flipState={cardUI.flipState}>
        <CardFaceComponent face={card.type.faces[card.visibleFaceIndex]}/>
      </CardComponent>
    );
  }

  const controller = new CardController(cardUI, animations);

  return {
    Component,
    controller,
  };
}
