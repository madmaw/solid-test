import { CardFace, CardFaceChoice, CardFaceChoiceBack, CardFaceResource, CardFaceResourceBack, CardFaceType } from "model/domain";
import styles from './card_face.module.scss';
import { UnreachableError } from "base/unreachable_error";
import { Match, Switch } from "solid-js";

export type CardFaceProps = {
  face: CardFace
};

export function CardFaceComponent(props: CardFaceProps) {
  return (
    <div class={styles.container}>
      <InternalCardFaceComponent face={props.face}/>
      {props.face.type}
    </div>
  );
}

function InternalCardFaceComponent(props: CardFaceProps) {
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
