import { CardFaceResourceBack, CardType } from "model/domain";
import { EffectStripComponent } from "components/effect/effect_strip";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceResourceBackComponent(props: {
  face: CardFaceResourceBack,
  cardType: CardType,
}) {
  return (
    <>
      <EffectStripComponent/>
      <CardFaceDescriptionComponent>
        <CardFaceNameComponent name={props.cardType.name}/>
      </CardFaceDescriptionComponent>
      <EffectStripComponent effects={props.face.cost}/>
    </>
  );
}

