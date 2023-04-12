import { Cutout } from 'components/book/cutout';
import styles from './test_page.module.scss';

function TestCutout() {
  return (
    // Since cutout rotates the div we need to either apply the translation before the rotation in the same style, or parent it in another element that translates it like this
    <div style={{
      transform: `translate(${Math.random() * 100}%, ${Math.random() * 100}%)`,
    }}>
      <Cutout>
        <div class={styles.testCutout} style={{ background: `#${Math.floor(Math.random() * 16777215).toString(16)}` }} />
      </Cutout>
    </div>
  );
}

export function TestPage() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      background: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }}>
      <TestCutout />
      <TestCutout />
      <TestCutout />
      <TestCutout />
    </div>
  );
}