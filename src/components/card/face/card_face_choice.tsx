import { CardFaceChoice, CardDefinition } from "model/domain";
import { CardFaceNameComponent } from "./card_face_name";
import { CardFaceDescriptionComponent } from "./card_face_description";

export function CardFaceChoiceComponent(props: {
  face: CardFaceChoice,
  definition: CardDefinition,
}) {
  return (
    <CardFaceDescriptionComponent>
      <CardFaceNameComponent
          name={props.face.name}/>
    </CardFaceDescriptionComponent>
  );
}

