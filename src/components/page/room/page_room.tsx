import { BookSpreadRoom } from "model/domain";
import { PageProps } from "../page";
import styles from './page_room.module.scss';
import { Cutout, CutoutProps } from "ui/cutout/cutout";

function TestCutout(props: Pick<CutoutProps, 'onPoppedUpOrDown' | 'up'>) {
  return (
    // Since cutout rotates the div we need to either apply the translation before the rotation in the same style, or parent it in another element that translates it like this
    
    <Cutout
        up={props.up}
        style={{
          top:`${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          position: 'absolute', 
        }}
        onPoppedUpOrDown={props.onPoppedUpOrDown}>
      <div
          class={styles.testCutout}
          style={{
            background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            transform: `scale(${1 + Math.random()}, ${1 + Math.random()})`,
          }}/>
    </Cutout>
  );
}


export function PageRoomComponent(props: PageProps<BookSpreadRoom>) {
  const onPoppedUpOrDown = props.animations.createCutoutPoppedUpOrDownCallback(
    'pop-up',
    'pop-down'
  );
  return (
    <div
        class={styles.room}
        style={{
          background: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }}>
      <TestCutout
          up={props.pageUI.popped}
          onPoppedUpOrDown={onPoppedUpOrDown}/>
      <TestCutout
          up={props.pageUI.popped}
          onPoppedUpOrDown={onPoppedUpOrDown}/>
      <TestCutout
          up={props.pageUI.popped}
          onPoppedUpOrDown={onPoppedUpOrDown}/>
      <TestCutout
          up={props.pageUI.popped}
          onPoppedUpOrDown={onPoppedUpOrDown}/>
    </div>
  );

}
