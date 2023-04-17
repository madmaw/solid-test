import { CardFaceResource, CardType } from "model/domain";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceResourceComponent(props: {
  cardType: CardType,
  face: CardFaceResource,
}) {
  return (
    <CardFaceDescriptionComponent>
      <CardFaceNameComponent name={props.cardType.name}/>
    </CardFaceDescriptionComponent>
  );
}

