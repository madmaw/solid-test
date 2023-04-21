import { Component, For, JSX, JSXElement, ParentProps, createMemo, createSignal } from 'solid-js';
import styles from './book.module.scss'
import { AnimationManager } from 'ui/animation/animation_manager';
import { Animations } from './book_controller';

export type PagePair = [JSXElement, JSXElement];

function PageComponent(props: ParentProps) {
  return (
    <div class={styles.page}>
      {props.children}
    </div>
  );
}

function BookHalfComponent(props: {topPage?: JSX.Element, bottomPage?: JSX.Element}) {
  return (
    <div class={styles['book-half']}>
      <div class={styles['book-half-front']}/>
      <div class={styles['book-half-right']}/>
      <div class={styles['book-half-left']}/>
      <div class={styles['book-half-top']}>
        <PageComponent>
          {props.topPage}
        </PageComponent>
      </div>
      <div class={styles['book-half-bottom']}>
        <PageComponent>
          {props.bottomPage}
        </PageComponent>
      </div>
    </div>
  )
}

export function BookComponent(props: ParentProps<{
  animations: AnimationManager<Animations>,
  previousPages: PagePair | undefined,
  currentPages: PagePair | undefined,
  turnLeftToRight: boolean,
  turnPastMidway: boolean,
  Cover: Component,
}>) {
  const [spineRef, setSpineRef] = createSignal<HTMLDivElement>();
  const rightPages = createMemo(() => {
    return props.previousPages && props.turnLeftToRight
        ? props.previousPages
        : props.currentPages;
  });
  const leftPages = createMemo(() => {
    return props.previousPages && !props.turnLeftToRight
        ? props.previousPages
        : props.currentPages;
  });
  const [pageTurnRef, setPageTurnRef] = createSignal<HTMLDivElement>();
  const onTurnAnimationEnd = props.animations.createAnimationEndEventListener(
    pageTurnRef,
    () => props.turnLeftToRight
        ? props.turnPastMidway
            ? ['turn', styles.ltrdown]
            : ['midway', styles.ltrup]
        : props.turnPastMidway
            ? ['turn', styles.rtldown]
            : ['midway', styles.rtlup]
  );

  return (
    <div class={styles.container}>
      <div class={styles.book}>
        {/* Right half */}
        <BookHalfComponent topPage={rightPages()?.[1]}/>
        {/* turning page */}
        {props.previousPages && props.currentPages && (
          <div classList={{
            [styles['turn-page']]: true,
          }}>
            <div
                ref={setPageTurnRef}
                classList={{
                  [styles['turn-page-rotate']]: true,
                  [styles.ltr]: props.turnLeftToRight,
                  [styles.rtl]: !props.turnLeftToRight,
                  [styles.down]: props.turnPastMidway,
                  [styles.up]: !props.turnPastMidway,
                }}
                onAnimationEnd={onTurnAnimationEnd}
            >
              <div classList={{
                [styles['turn-page-flip']]: true,
                [styles.ltr]: props.turnLeftToRight,
                [styles.rtl]: !props.turnLeftToRight,
                [styles.down]: props.turnPastMidway,
                [styles.up]: !props.turnPastMidway,
              }}>
                <PageComponent>
                  {props.turnLeftToRight && !props.turnPastMidway
                      || !props.turnLeftToRight && props.turnPastMidway
                      ? rightPages()?.[0] 
                      : leftPages()?.[1]
                  }
                </PageComponent>
              </div>
            </div>
          </div>
        )}
        <div
            classList={{
              [styles.spine]: true,
              [styles.open]: props.currentPages != null,
            }}
            onTransitionEnd={props.animations.createTransitionEndEventListener(
              spineRef,
              () => 'open',
            )}
            ref={setSpineRef}>
          {/* Left half */}
          <BookHalfComponent
              topPage={<props.Cover/>}
              bottomPage={leftPages()?.[0]}/>
        </div>
        {/* spread overlay (monsters etc...)*/}
        {props.children && (
          <div class={styles.spread}>
            {props.children}
          </div>
        )}
      </div>
    </div>
  );
}
