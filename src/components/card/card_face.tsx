import { CardFace, CardFaceChoice, CardFaceChoiceBack, CardFaceResource, CardFaceResourceBack, CardFaceType } from "model/domain";
import styles from './card_face.module.scss';
import { Component, Match, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";


const cardFaceComponents: { [K in CardFaceType]: Component<CardFaceProps>} = {
  [CardFaceType.Resource]: function (props: CardFaceProps) {
    return <InternalCardFaceResourceComponent face={props.face as CardFaceResource}/>;
  },
  [CardFaceType.ResourceBack]: function (props: CardFaceProps) {
    return <InternalCardFaceResourceBackComponent face={props.face as CardFaceResourceBack}/>;
  },
  [CardFaceType.Choice]: function (props: CardFaceProps) {
    return <InternalCardFaceChoiceComponent face={props.face as CardFaceChoice}/>;
  },
  [CardFaceType.ChoiceBack]: function (props: CardFaceProps) {
    return <InternalCardFaceChoiceBackComponent face={props.face as CardFaceChoiceBack}/>;
  },
}

export type CardFaceProps = {
  face: CardFace
};

export function CardFaceComponent(props: CardFaceProps) {
  return (
    <div class={styles.container}>
      <Dynamic
          component={cardFaceComponents[props.face.type]}
          face={props.face}/>
    </div>
  );
}

function InternalCardFaceResourceComponent(props: {
  face: CardFaceResource,
}) {
  return <div classList={{
    [styles['card-face']]: true,
    [styles['resource']]: true,
  }}>Resource</div>;
}

function InternalCardFaceResourceBackComponent(props: {
  face: CardFaceResourceBack,
}) {
  return <div classList={{
    [styles['card-face']]: true,
    [styles['resource-back']]: true,
  }}>Resource Back</div>;
}

function InternalCardFaceChoiceComponent(props: {
  face: CardFaceChoice,
}) {
  return <div classList={{
    [styles['card-face']]: true,
    [styles['choice']]: true,
  }}/>;
}

function InternalCardFaceChoiceBackComponent(props: {
  face: CardFaceChoiceBack,
}) {
  return <div classList={{
    [styles['card-face']]: true,
    [styles['choice-back']]: true,
  }}/>;
}
