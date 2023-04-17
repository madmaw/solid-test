import { CardFaceChoice, CardType } from "model/domain";
import { CardFaceNameComponent } from "./card_face_name";
import { CardFaceDescriptionComponent } from "./card_face_description";

export function CardFaceChoiceComponent(props: {
  face: CardFaceChoice,
  cardType: CardType,
}) {
  return (
    <CardFaceDescriptionComponent>
      <CardFaceNameComponent
          name={props.cardType.name}/>
    </CardFaceDescriptionComponent>
  );
}

