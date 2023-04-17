import { CardFaceChoice, CardType } from "model/domain";
import { EffectStripComponent } from "components/effect/effect_strip";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceChoiceComponent(props: {
  face: CardFaceChoice,
  cardType: CardType,
}) {
  return (
    <>
      <EffectStripComponent effects={props.face.effect}/>
      <CardFaceNameComponent name={props.cardType.name}/>
      <EffectStripComponent effects={props.face.cost}/>
    </>
  );
}

