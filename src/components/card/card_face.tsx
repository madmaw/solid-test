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
      <InternalCardFaceComponent2 face={props.face}/>
    </div>
  );
}

function InternalCardFaceComponent2(props: CardFaceProps) {
  return <Dynamic component={cardFaceComponents[props.face.type]} face={props.face}/>;
}

function InternalCardFaceComponent(props: CardFaceProps) {
  // TODO (chris.g) re-attempt this with a straight switch statement
  return (
    <Switch>
      <Match when={props.face?.type === CardFaceType.Resource}>
        <InternalCardFaceResourceComponent face={props.face as CardFaceResource}/>
      </Match>
      <Match when={props.face?.type === CardFaceType.ResourceBack}>
        <InternalCardFaceResourceBackComponent face={props.face as CardFaceResourceBack}/>
      </Match>
      <Match when={props.face?.type === CardFaceType.Choice}>
        <InternalCardFaceChoiceComponent face={props.face as CardFaceChoice}/>
      </Match>
      <Match when={props.face?.type === CardFaceType.ChoiceBack}>
        <InternalCardFaceChoiceBackComponent face={props.face as CardFaceChoiceBack}/>
      </Match>
    </Switch>
  );
}

function InternalCardFaceResourceComponent(props: {
  face: CardFaceResource,
}) {
  return <div classList={{
    [styles['card-face']]: true,
    [styles['resource']]: true,
  }}/>;
}

function InternalCardFaceResourceBackComponent(props: {
  face: CardFaceResourceBack,
}) {
  return <div classList={{
    [styles['card-face']]: true,
    [styles['resource-back']]: true,
  }}/>;
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
