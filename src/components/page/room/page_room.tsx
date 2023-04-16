import { BookSpreadRoom } from "model/domain";
import { PageProps } from "../page";
import styles from './page_room.module.scss';
import { Cutout, CutoutProps } from "ui/cutout/cutout";
import { For } from "solid-js";

type TestCutout = {
  leftPercent: number,
  topPercent: number,
  widthPercent: number,
  heightPercent: number,
  color: string,
}

function TestCutoutComponent(props: Pick<CutoutProps, 'onPoppedUpOrDown' | 'up'> & {
  cutout: TestCutout,
}) {
  return (
    // Since cutout rotates the div we need to either apply the translation before the rotation in the same style, or parent it in another element that translates it like this
    
    <Cutout
        up={props.up}
        style={{
          top: `${props.cutout.topPercent}%`,
          left: `${props.cutout.leftPercent}%`,
          width: `${props.cutout.widthPercent}%`,
          height: `${props.cutout.heightPercent}%`,
          "transition-delay": `${(100 - props.cutout.topPercent) * 10}ms`,
          position: 'absolute', 
        }}
        onPoppedUpOrDown={props.onPoppedUpOrDown}>
      <div
          class={styles.testCutout}
          style={{
            background: props.cutout.color,
          }}/>
    </Cutout>
  );
}


export function PageRoomComponent(props: PageProps<BookSpreadRoom>) {
  const onPoppedUpOrDown = props.animations.createCutoutPoppedUpOrDownCallback(
    'pop-up',
    'pop-down'
  );
  const cutouts = new Array(3 + Math.floor(Math.random() * 30)).fill(0).map<TestCutout>(() => {
    const widthPercent = Math.random() * 5 + 3;
    const heightPercent = Math.pow(Math.random(), 2) * 15 + 5;
    const leftPercent = Math.random() * (100 - widthPercent);
    const topPercent = Math.random() * (100 - heightPercent);
    return {
      topPercent,
      leftPercent,
      widthPercent,
      heightPercent, 
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
  });
  return (
    <div
        class={styles.room}
        style={{
          background: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }}>
      <For each={cutouts}>
        {cutout => (
          <TestCutoutComponent
              up={props.pageUI.popped}
              onPoppedUpOrDown={onPoppedUpOrDown}
              cutout={cutout}/>
        )}
      </For>
    </div>
  );

}
