import { CardFaceChoiceBack } from "model/domain";
import cardFaceStyles from './card_face.module.scss';
import styles from './card_face_choice_back.module.scss';

export function CardFaceChoiceBackComponent(props: {
  face: CardFaceChoiceBack,
}) {
  return <div classList={{
    [cardFaceStyles['card-face']]: true,
    [styles['choice-back']]: true,
  }}/>;
}
