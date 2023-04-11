import { Index, JSX, createSignal } from 'solid-js';
import styles from './book.module.css'

const FAKE_PAGE_COUNT = 128;

export type Page = {

}
export function Page({
  z,
  onClick,
  style
}: {
  z: number,
  onClick?: () => void,
  style?: JSX.CSSProperties,
}) {
  return (
    <div class={styles.page} onClick={onClick} style={{
      transform: `translateZ(${z}px)`,
      ...style
    }} />
  );
}

export function Book({
}: {
  }) {

  const [open, setOpen] = createSignal(false);

  function onClickHandler() {
    setOpen(true);
  }

  /* TODO: use an animation to center book */
  return <div class={styles.book} style={{ transform: `rotateX(45deg) translateX(${open() ? 50 : 0}%)` }}>
    {/* Back half */}
    <Page z={-0.5 - FAKE_PAGE_COUNT / 2} style={{
      background: 'blue'
    }} />

    <Index each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>{(page) =>
      // `FAKE_PAGE_COUNT / 2 - 1` is just so DOM order matches physical order but its pretty ugly, can probably just use `z-index`
      <Page z={-1.5 - (FAKE_PAGE_COUNT / 2 - 1 - page())} />
    }</Index>

    {/* Back page */}
    <Page z={-0.5} />

    <div classList={{
      [styles.spine]: true,
      [styles.open]: open(),
    }}>
      {/* Front page */}
      <Page z={0.5} />

      {/* Front half */}
      <Index each={[...Array(FAKE_PAGE_COUNT / 2).keys()]}>{(page, _) =>
        <Page z={1.5 + page()} />
      }</Index>

      <Page z={0.5 + FAKE_PAGE_COUNT / 2} onClick={onClickHandler} style={{
        background: 'red'
      }} />
    </div>
  </div >;
}
