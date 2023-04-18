import { CardFaceResource, CardDefinition } from "model/domain";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceResourceComponent(props: {
  definition: CardDefinition,
  face: CardFaceResource,
}) {
  return (
    <CardFaceDescriptionComponent>
      <CardFaceNameComponent name={props.face.name}/>
    </CardFaceDescriptionComponent>
  );
}

