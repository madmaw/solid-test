import { CardFaceResourceBack, CardDefinition } from "model/domain";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceResourceBackComponent(props: {
  face: CardFaceResourceBack,
  definition: CardDefinition,
}) {
  return (
    <CardFaceDescriptionComponent>
      <CardFaceNameComponent name={props.definition.name}/>
    </CardFaceDescriptionComponent>
  );
}

