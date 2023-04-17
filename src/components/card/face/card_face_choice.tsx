import { CardFaceChoice, CardType } from "model/domain";
import { EffectStripComponent } from "components/effect/effect_strip";
import { CardFaceNameComponent } from "./card_face_name";
import { CardFaceDescriptionComponent } from "./card_face_description";

export function CardFaceChoiceComponent(props: {
  face: CardFaceChoice,
  cardType: CardType,
}) {
  return (
    <>
      <EffectStripComponent effects={props.face.effect}/>
      <CardFaceDescriptionComponent>
        <CardFaceNameComponent name={props.cardType.name}/>
      </CardFaceDescriptionComponent>
      <EffectStripComponent effects={props.face.cost}/>
    </>
  );
}

