import { ParentProps } from "solid-js";

import styles from './symbol.module.scss';

export type SymbolProps = {
  fill: string,
  stroke: string,
};

export function SymbolSVGComponent(props: ParentProps<SymbolProps>) {
  return (
    <svg
        viewBox="0 0 100 100"
        class={styles.svg}
        style={{
          fill: props.fill,
          stroke: props.stroke,
        }}>
      {props.children}
    </svg>
  );
}