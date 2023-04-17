import styles from './card_face_name.module.scss';

export function CardFaceNameComponent(props: {
  name: string,
}) {
  return (<div class={styles.container}>{props.name}</div>);
}