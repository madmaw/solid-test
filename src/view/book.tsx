import styles from './book.module.css'
import { Cutout } from './cutout';

export function Book(props: {}) {
  return <div class={styles.book}>
    <div class={`${styles.page} ${styles.left}  ${styles.open}`} style={{ background: 'red' }}>
      <Cutout />
      <Cutout />
      <Cutout />
    </div>
    <div class={`${styles.page} ${styles.right}  ${styles.open}`} style={{ background: 'blue' }}></div>
  </div >;
}
