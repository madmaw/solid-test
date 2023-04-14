import { Component, Ref } from "solid-js";
import styles from './table.module.scss';
import { Animations, View } from "./table_controller";
import { AnimationManager } from "base/animation_manager";

export function TableComponent(props: {
  Book: Component,
  Hand: Component,
  Deck: Component,
  view: View,
  animations: AnimationManager<Animations>,
}) {
  let tableElement: HTMLDivElement | undefined;
  return (
    <div class={styles.room}>
      <div class={styles.container}>
        <div
            classList={{
              [styles.table]: true,
              [styles.tilted]: props.view === View.Tilted,
              [styles.topDown]: props.view === View.TopDown,
              [styles.topDownBookCentered]: props.view === View.TopDownBookCentered,
            }}
            onTransitionEnd={props.animations.createTransitionEndCallback('view', tableElement)}
            ref={tableElement}>
          <div class={styles['book-slot']}>
            <props.Book/>
          </div>
          <div class={styles['hand-slot']}>
            <props.Hand/>
          </div>
          <div class={styles['deck-slot']}>
            <props.Deck/>
          </div>
        </div>
      </div>
    </div>
  );
}
