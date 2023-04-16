import { CardFaceChoice } from "model/domain";
import cardFaceStyles from './card_face.module.scss';
import styles from './card_face_choice.module.scss';

export function CardFaceChoiceComponent(props: {
  face: CardFaceChoice,
}) {
  return <div classList={{
    [cardFaceStyles['card-face']]: true,
    [styles['choice']]: true,
  }}/>;
}

