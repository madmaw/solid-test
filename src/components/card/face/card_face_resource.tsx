import { CardFaceResource } from "model/domain";
import cardFaceStyles from './card_face.module.scss';
import styles from './card_face_resource.module.scss';

export function CardFaceResourceComponent(props: {
  face: CardFaceResource,
}) {
  return <div classList={{
    [cardFaceStyles['card-face']]: true,
    [styles['resource']]: true,
  }}>Resource</div>;
}

