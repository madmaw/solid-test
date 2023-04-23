import { ParentProps } from "solid-js";
import styles from './card_face_description.module.scss';

export function CardFaceDescriptionComponent(props: ParentProps) {
  return (
    <div class={styles.container}>
      {props.children}
    </div>
  );
}