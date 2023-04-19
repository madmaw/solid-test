import { For, JSX, JSXElement, ParentProps, createSignal } from 'solid-js';
import styles from './book.module.scss'
import { AnimationManager } from 'ui/animation/animation_manager';
import { Animations } from './book_controller';

const FAKE_PAGE_COUNT = 64;

export type PagePair = [JSXElement, JSXElement];

export function PageComponent(props: ParentProps<{
  z: number,
  onClick?: () => void,
  // TODO: find correct typing for style
  style?: JSX.CSSProperties,
}>) {
  return (
    <div class={styles.page} onClick={props.onClick} style={{
      transform: `translateZ(${props.z}px)`,
      ...props.style
    }}>
      {props.children}
    </div>
  );
}

export function BookComponent(props: ParentProps<{
  animations: AnimationManager<Animations>,
  previousPages: PagePair | undefined,
  currentPages: PagePair | undefined,
  onClickCover?: () => void,
}>) {
  const [spineRef, setSpineRef] = createSignal<HTMLDivElement>();
  return (
    <div class={styles.container}>
      <div class={styles.book}>
        {/* Back half */}
        <PageComponent z={-0.5 - FAKE_PAGE_COUNT / 2}/>

        <For each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>
          {page =>
            // `FAKE_PAGE_COUNT / 2 - 1` is just so DOM order matches physical order but its pretty ugly, can probably just use `z-index`
            <PageComponent z={-1.5 - (FAKE_PAGE_COUNT / 2 - 1 - page)} />
          }
          </For>

        {/* Right page */}
        <PageComponent z={-0.5}>
          {props.currentPages?.[1]}
        </PageComponent>

        <div
            classList={{
              [styles.spine]: true,
              [styles.open]: props.currentPages != null,
            }}
            onAnimationEnd={props.animations.createAnimationEndEventListener(
              spineRef,
              () => ['turn', styles.openAnimation],
            )}
            ref={setSpineRef}>
          {/* Left page */}
          <PageComponent z={0.5}>
            {/* The left page has been rotated so we have to rotate its contents back */}
            <div style={{ transform: 'rotateY(180deg)' }}>
              {props.currentPages?.[0]}
            </div>
          </PageComponent>

          {/* Front half */}
          <For each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>
            {page =>
              <PageComponent z={1.5 + page} />
            }
          </For>

          <PageComponent z={0.5 + FAKE_PAGE_COUNT / 2} onClick={props.onClickCover}>
            <h1>GRAND TERMINUS</h1>
          </PageComponent>
        </div>
        {props.children && (
          <div class={styles.spread}>
            {props.children}
          </div>
        )}
      </div>
    </div>
  );
}
