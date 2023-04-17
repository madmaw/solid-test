import { CardFaceResourceBack, CardType } from "model/domain";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";

export function CardFaceResourceBackComponent(props: {
  face: CardFaceResourceBack,
  cardType: CardType,
}) {
  return (
    <CardFaceDescriptionComponent>
      <CardFaceNameComponent name={props.cardType.name}/>
    </CardFaceDescriptionComponent>
  );
}

