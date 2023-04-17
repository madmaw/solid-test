import { CardBackgroundType, CardFace, CardFaceChoice, CardFaceChoiceBack, CardFaceResource, CardFaceResourceBack, CardFaceType, CardType } from "model/domain";
import styles from './card_face.module.scss';
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { CardFaceResourceComponent } from "./card_face_resource";
import { CardFaceResourceBackComponent } from "./card_face_resource_back";
import { CardFaceChoiceComponent } from "./card_face_choice";
import { CardFaceChoiceBackComponent } from "./card_face_choice_back";


const cardFaceComponents: { [K in CardFaceType]: Component<CardFaceProps>} = {
  [CardFaceType.Resource]: function (props: CardFaceProps) {
    return <CardFaceResourceComponent
        face={props.face as CardFaceResource}
        cardType={props.cardType}/>;
  },
  [CardFaceType.ResourceBack]: function (props: CardFaceProps) {
    return <CardFaceResourceBackComponent
        face={props.face as CardFaceResourceBack}
        cardType={props.cardType}/>;
  },
  [CardFaceType.Choice]: function (props: CardFaceProps) {
    return <CardFaceChoiceComponent
        face={props.face as CardFaceChoice}
        cardType={props.cardType}/>;
  },
  [CardFaceType.ChoiceBack]: function (props: CardFaceProps) {
    return <CardFaceChoiceBackComponent
        face={props.face as CardFaceChoiceBack}/>;
  },
}

export type CardFaceProps = {
  face: CardFace
  cardType: CardType,
};

export function CardFaceComponent(props: CardFaceProps) {
  return (
    <div classList={{
      [styles['card-face']]: true,
      [styles['backgroundClear']]: props.face.background === CardBackgroundType.Clear,
      [styles['backgroundCrosshatched']]: props.face.background === CardBackgroundType.Crosshatched,
      [styles['backgroundDoor']]: props.face.background === CardBackgroundType.Door,
      [styles['backgroundPassageway']]: props.face.background === CardBackgroundType.Passageway,
    }}>
      <Dynamic
          component={cardFaceComponents[props.face.type]}
          face={props.face}
          cardType={props.cardType}/>
    </div>
  );
}
