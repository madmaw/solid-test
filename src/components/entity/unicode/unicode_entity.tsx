import styles from './unicode_entity.module.scss';

export function UnicodeEntityComponent(props: {
  unicode: string,
  fontSize?: string,
}) {
  return (
    <div
        class={styles.entity}
        style={props.fontSize && { 'font-size': props.fontSize }}>
      {props.unicode}
    </div>
  );
}