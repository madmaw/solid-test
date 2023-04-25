import styles from './entity_age.module.scss';

export function EntityAgeComponent(props: {
  age: number,
}) {
  return (
    <div class={styles.container}>
      {props.age} years old
    </div>
  );
}
