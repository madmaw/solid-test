import { Component, createSignal } from "solid-js";
import styles from './table.module.scss';
import { Animations, View } from "./table_controller";
import { AnimationManager } from "ui/animation/animation_manager";

export function TableComponent(props: {
  Book: Component,
  Hand: Component,
  Deck: Component,
  SpreadOverlay: Component,
  StatusOverlay: Component,
  view: View,
  lookDx: number,
  lookDy: number,
  animations: AnimationManager<Animations>,
}) {
  const [tableRef, setTableRef] = createSignal<HTMLDivElement>();
  return (
    <div class={styles.container}>
      <div
          classList={{
            [styles.room]: true,
          }}
          style={props.view === View.Tilted ? {
            transform: `translate(${props.lookDx * -20}vmin, ${-props.lookDy*20}vmin) rotateX(${-props.lookDy/2}rad)`
          } : undefined}
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
          <div class={styles.deck}>
            <props.Deck/>
          </div>
          <div class={styles.hand}>
            <props.Hand/>
          </div>
        </div>
      </div>
      <div class={styles['status-overlay']}>
        <props.StatusOverlay/>
      </div>
    </div>
  );
}
