import styles from './unicode_entity.module.scss';

export function UnicodeEntityComponent(props: {
  unicode: string,
}) {
  return (
    <div class={styles.entity}>{props.unicode}</div>
  );
}