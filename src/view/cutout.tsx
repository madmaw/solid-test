import styles from './cutout.module.css';

export function Cutout({
  children
}: {
  children?: string | Node | Node[]
}) {
  return <div class={styles.cutout}>
    {children}
  </div>
}
