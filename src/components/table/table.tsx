import { Component, createSignal } from "solid-js";
import styles from './table.module.scss';
import { Animations, View } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";

export function TableComponent(props: {
  Book: Component,
  Hand: Component,
  Deck: Component,
  SpreadOverlay: Component,
  DragOverlay: Component,
  view: View,
  animations: AnimationManager<Animations>,
  onDragCancel: () => void,
  dragging: boolean,
}) {
  const [tableRef, setTableRef] = createSignal<HTMLDivElement>();
  return (
    <div class={styles.container}>
      <div
          classList={{
            [styles.room]: true,
            [styles.dragging]: props.dragging,
          }}
          onMouseUp={props.onDragCancel}
      >
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
          <div class={styles.book}>
            <props.Book/>
          </div>
          <div class={styles['spread-overlay']}>
            <props.SpreadOverlay/>
          </div>
          <div class={styles.hand}>
            <props.Hand/>
          </div>
          <div class={styles.deck}>
            <props.Deck/>
          </div>
        </div>
      </div>
      <div class={styles['drag-overlay']}>
        <props.DragOverlay/>
      </div>
    </div>
  );
}
