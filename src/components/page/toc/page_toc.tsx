import { BookSpreadTableOfContents, BookSpreadType } from "model/domain";
import { PageProps } from "../page";
import { PageSide } from "../page_controller";
import { Component } from "solid-js";
import { PageBlankComponent } from "../blank/page_blank";
import { Dynamic } from "solid-js/web";
import { Cutout } from "ui/cutout/cutout";
import styles from './page_toc.module.scss';

type PageToCProps = PageProps<BookSpreadTableOfContents>;

const sideComponents: { [K in PageSide]: Component<PageToCProps>} = {
  [PageSide.Left]:PageBlankComponent,
  [PageSide.Right]: function (props: PageToCProps) {
    return <PageTocRightComponent
        animations={props.animations}
        pageUI={props.pageUI}
        side={props.side}
        spread={props.spread}/>
  },
}


export function PageToCComponent(props: PageToCProps) {
  return (
    <Dynamic
      component={sideComponents[props.side]} animations={props.animations}
      pageUI={props.pageUI}
      side={props.side}
      spread={props.spread}
    />
  );
}

function PageTocRightComponent(props: PageToCProps) {
  return (
    <div class={styles.toc}>
      <Cutout
          class={styles.row}
          up={props.pageUI.popped}
          onPoppedUpOrDown={props.animations.createCutoutPoppedUpOrDownCallback('pop-up', 'pop-down')}>
        <h1>GRAND TERMINUS</h1>
      </Cutout>
      <Cutout
          class={styles.row}
          up={props.pageUI.popped}
          onPoppedUpOrDown={props.animations.createCutoutPoppedUpOrDownCallback('pop-up', 'pop-down')}>
        <button>
          <h2>Begin Origin</h2>
        </button>
      </Cutout>
    </div >  
  );
}
