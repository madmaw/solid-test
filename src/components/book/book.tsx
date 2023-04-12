import { Index, JSX, children } from 'solid-js';
import styles from './book.module.scss'

const FAKE_PAGE_COUNT = 128;

function Page({
  z,
  onClick,
  style,
  children,
}: {
  z: number,
  onClick?: () => void,
  style?: JSX.CSSProperties,
  children?: JSX.Element
}) {
  return (
    <div class={styles.page} onClick={onClick} style={{
      transform: `translateZ(${z}px)`,
      ...style
    }}>
      {children}
    </div>
  );
}

export function Book(props: {
  open: boolean,
  onClickCover: () => void,
}) {

  return (
    <div class={styles.container}>
      <div class={styles.book}>
        {/* Back half */}
        <Page z={-0.5 - FAKE_PAGE_COUNT / 2} style={{
          background: 'black'
        }} />

        <Index each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>{(page) =>
          // `FAKE_PAGE_COUNT / 2 - 1` is just so DOM order matches physical order but its pretty ugly, can probably just use `z-index`
          <Page z={-1.5 - (FAKE_PAGE_COUNT / 2 - 1 - page())} />
        }</Index>

        {/* Back page */}
        <Page z={-0.5} />

        <div classList={{
          [styles.spine]: true,
          [styles.open]: props.open,
        }}>
          {/* Front page */}
          <Page z={0.5} />

          {/* Front half */}
          <Index each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>{(page, _) =>
            <Page z={1.5 + page()} />
          }</Index>

          <Page z={0.5 + FAKE_PAGE_COUNT / 2} onClick={props.onClickCover} style={{
            background: 'black',
            'text-align': 'center',
            color: 'white'
          }}>
            <h1>GRAND TERMINUS</h1>
          </Page>
        </div>
      </div>
    </div>
  );
}
