import { JSX, ParentProps } from 'solid-js';
import styles from './cutout.module.scss';

// TODO: find correct typing for style
export function Cutout(props: ParentProps & { style?: JSX.CSSProperties }) {
  return <div class={styles.cutout} style={props.style}>
    {props.children}
  </div>
}
