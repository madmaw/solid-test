import { CardFaceResourceBack } from "model/domain";
import styles from './card_face_resource_back.module.scss';
import cardFaceStyles from './card_face.module.scss';

export function CardFaceResourceBackComponent(props: {
  face: CardFaceResourceBack,
}) {
  return <div classList={{
    [cardFaceStyles['card-face']]: true,
    [styles['resource-back']]: true,
  }}>Resource Back</div>;
}

