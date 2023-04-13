import { Index, JSX, ParentProps } from 'solid-js';
import styles from './book.module.scss'
import { PagePair } from './book_controller';

const FAKE_PAGE_COUNT = 128;

export function Page(props: ParentProps & {
  z: number,
  onClick?: () => void,

  // TODO: find correct typing for style
  style?: JSX.CSSProperties,
}) {
  return (
    <div class={styles.page} onClick={props.onClick} style={{
      transform: `translateZ(${props.z}px)`,
      ...props.style
    }}>
      {props.children}
    </div>
  );
}

export function Book(props: {
  opened: boolean,
  pages?: PagePair,
  onClickCover?: () => void,
}) {
  /* TODO: use an animation to center book */
  return (
    <div class={styles.container}>
      <div class={styles.book}>
        {/* Back half */}
        <Page z={-0.5 - FAKE_PAGE_COUNT / 2}/>

        <Index each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>{(page) =>
          // `FAKE_PAGE_COUNT / 2 - 1` is just so DOM order matches physical order but its pretty ugly, can probably just use `z-index`
          <Page z={-1.5 - (FAKE_PAGE_COUNT / 2 - 1 - page())} />
        }</Index>

        {/* Right page */}
        <Page z={-0.5}>
          {props.pages && <props.pages.Right />}
        </Page>

        <div classList={{
          [styles.spine]: true,
          [styles.open]: props.opened,
        }}>
          {/* Left page */}
          <Page z={0.5}>
            {/* The left page has been rotated so we have to rotate its contents back */}
            <div style={{ transform: 'rotateY(180deg)' }}>
              {props.pages && <props.pages.Left />}
            </div>
          </Page>

          {/* Front half */}
          <Index each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>{(page, _) =>
            <Page z={1.5 + page()} />
          }</Index>

          <Page z={0.5 + FAKE_PAGE_COUNT / 2} onClick={props.onClickCover}>
            <h1>GRAND TERMINUS</h1>
          </Page>
        </div>
      </div>
    </div>
  );
}
