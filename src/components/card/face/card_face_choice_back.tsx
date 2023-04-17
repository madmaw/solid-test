import { CardFaceChoiceBack } from "model/domain";
import { EffectStripComponent } from "components/effect/effect_strip";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceChoiceBackComponent(props: {
  face: CardFaceChoiceBack,
}) {
  return (
    <>
      <EffectStripComponent/>
      <CardFaceDescriptionComponent>
        <CardFaceNameComponent name={props.face.name}/>
      </CardFaceDescriptionComponent>
      <EffectStripComponent effects={props.face.cost}/>
    </>
  );
}
