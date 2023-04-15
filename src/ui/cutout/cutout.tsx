import { JSX, ParentProps, createEffect } from 'solid-js';
import styles from './cutout.module.scss';

export type CutoutProps = ParentProps<{
  style?: JSX.CSSProperties,
  class?: string,
  up: boolean,
  onPoppedUpOrDown?: (up: boolean) => void,
}>;

// TODO: find correct typing for style
export function Cutout(props: CutoutProps) {
  let cutoutRef: HTMLDivElement | undefined;
  const onTransitionEnd = function(e: TransitionEvent) {
    if (e.target === cutoutRef) {
      props.onPoppedUpOrDown?.(props.up);
    }
  };  

  return (
    <div
        ref={cutoutRef}
        class={props.class}
        classList={{
          [styles.cutout]: true,
          [styles.up]: props.up,
        }}
        style={props.style}
        onTransitionEnd={onTransitionEnd}
    >
      {props.children}
    </div>
  );
}
