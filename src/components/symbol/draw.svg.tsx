import styles from'./draw.svg.module.scss';

export function SymbolDrawSVGComponent() {
  return (
      <g>
        <rect class={styles.rect}/>
        <path
            d="M 30 60 L 50 40 L 70 60"/>
      </g>
  );
}
