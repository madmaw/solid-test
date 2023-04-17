import { CardFaceChoiceBack } from "model/domain";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceChoiceBackComponent(props: {
  face: CardFaceChoiceBack,
}) {
  return (
    <>
      <CardFaceDescriptionComponent>
        <CardFaceNameComponent name={props.face.name}/>
      </CardFaceDescriptionComponent>
    </>
  );
}
