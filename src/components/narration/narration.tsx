import styles from './narration.module.scss';
import { For } from "solid-js";

export function NarrationComponent(props: {
  index: number,
  words: readonly string[],
}) {
  return (
      <For each={props.words}>
        {(word, index) => (
          <span classList={{
            [styles.word]: true,
            [styles.visible]: index() < props.index,
          }}>{word} </span>
        )}
      </For>
  );
}