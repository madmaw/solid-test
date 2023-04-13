import { Card } from "model/domain";
import { Animations, CardController, cardUIDescriptor } from "./card_controller";
import { AnimationManager } from "base/animation_manager";

export function createCard({
  card,
}: {
  card: Card,
}) {

  const animations = new AnimationManager<Animations>();
  const cardUI = cardUIDescriptor.create({
    card,
    flippedVertical: false,
  })

  function Component() {

  }

  const controller = new CardController(cardUI, animations);

  return {
    Component,
    controller,
  };
}
