import styles from './app.module.scss'
import { Book } from './book'

export function App() {
  return <div class={styles.container}><Book /></ div>;
}