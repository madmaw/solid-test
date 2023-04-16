import { Component, createSignal } from "solid-js";
import styles from './table.module.scss';
import { Animations, View } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";

export function TableComponent(props: {
  Book: Component,
  Overlay: Component,
  Hand: Component,
  Deck: Component,
  view: View,
  animations: AnimationManager<Animations>,
}) {
  const [tableRef, setTableRef] = createSignal<HTMLDivElement>();
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
            onTransitionEnd={props.animations.createTransitionEndEventListener(
              tableRef,
              () => props.view
            )}
            ref={setTableRef}>
          <div class={styles['book-slot']}>
            <props.Book/>
          </div>
          <div class={styles['overlay-slot']}>
            <props.Overlay/>
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
