import { SymbolMagicComponent } from 'components/symbol/symbol';
import styles from './chrononomicon.module.scss';

export function ChrononomiconCoverComponent() {
  return (
    <div class={styles.container}>
      <h1>Chrononomicon</h1>
      <div class={styles.icon}>
        <SymbolMagicComponent fill="transparent" stroke={styles.foreground}/>
      </div>
    </div>
  );
}