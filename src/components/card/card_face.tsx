import { CardFace, CardFaceChoice, CardFaceChoiceBack, CardFaceResource, CardFaceResourceBack, CardFaceType } from "model/domain";
import styles from './card_face.module.scss';
import { UnreachableError } from "base/unreachable_error";

export type CardFaceProps = {
  face: CardFace
};

export function CardFaceComponent(props: CardFaceProps) {
  return (
    <div class={styles.container}>
      <InternalCardFaceComponent {...props}/>
    </div>
  );
}

function InternalCardFaceComponent(props: CardFaceProps) {
  switch (props.face.type) {
    case CardFaceType.Resource:
      return <InternalCardFaceResourceComponent face={props.face}/>;
    case CardFaceType.ResourceBack:
      return <InternalCardFaceResourceBackComponent face={props.face}/>;
    case CardFaceType.Choice:
      return <InternalCardFaceChoiceComponent face={props.face}/>;
    case CardFaceType.ChoiceBack:
      return <InternalCardFaceChoiceBackComponent face={props.face}/>;
    default:
      throw new UnreachableError(props.face);
  }
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
