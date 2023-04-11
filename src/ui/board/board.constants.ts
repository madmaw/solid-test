import { parsePx } from 'base/parse_css';
import styles from './board.module.scss';

export const boardWidth = parsePx<number>(styles.tableWidth, 0);
export const boardHeight = parsePx(styles.tableHeight, 0);