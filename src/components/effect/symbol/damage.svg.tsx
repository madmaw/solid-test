import styles from'./damage.svg.module.scss';

export function SymbolDamageSVGComponent() {
  return (
      <g>
        <path
            d="M 50 10 L 90 50 L 90 90 L 10 90 L 10 50 z"
            class={styles.path}/>
        <path
            d="M 50 80 L 50 30"
            class={styles.path}/>
        <path
            d="M 40 70 L 60 70"
            class={styles.path}/>

      </g>
  );
}
