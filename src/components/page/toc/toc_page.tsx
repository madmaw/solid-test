import { BookSpreadTableOfContents } from "model/domain";
import { PageProps } from "../page";
import { PageSide } from "../page_controller";
import { Component } from "solid-js";
import { PageBlankComponent } from "../blank/page_blank";
import { Dynamic } from "solid-js/web";
import styles from './page_toc.module.scss';
import { NavigationTargetType } from "components/navigation_target";

type PageToCProps = PageProps<BookSpreadTableOfContents>;

function ToCEntryComponent(props: PageToCProps & {
  targetChapter: number,
  name: string,
}) {
  return (
    <li classList={{
      [styles.disabled]: props.spread.unlockedChapters < props.targetChapter
    }}>
      <a href="#" onClick={() => props.navigation({
        type: NavigationTargetType.Chapter,
        chapterIndex: props.targetChapter,
      })}>{props.name}</a>
    </li>
  );
}

function ToCPageRightComponent(props: PageToCProps) {
  return (
    <div class={styles.toc}>
      <h2>
        Table of Contents
      </h2>
      <ol>
        <ToCEntryComponent targetChapter={0} name="Prologue" {...props}/>
        <ToCEntryComponent targetChapter={1} name="The Road" {...props}/>
        <ToCEntryComponent targetChapter={2} name="The Ruins" {...props}/>
        <ToCEntryComponent targetChapter={3} name="The Tower" {...props}/>
      </ol>
    </div >  
  );
}

const sideComponents: { [K in PageSide]: Component<PageToCProps>} = {
  [PageSide.Left]:PageBlankComponent,
  [PageSide.Right]: function (props: PageToCProps) {
    return <ToCPageRightComponent
        side={props.side}
        spread={props.spread}
        navigation={props.navigation}/>
  },
}


export function ToCPageComponent(props: PageToCProps) {
  return (
    <Dynamic
      component={sideComponents[props.side]}
      side={props.side}
      spread={props.spread}
      navigation={props.navigation}
    />
  );
}

/*
      <p>
        Once upon a time there was a poor, old man who heard of a great and terrible book.
      </p>
      <p>
        It was said just reading this book could make you rich, young, and powerful.
      </p>
      <p>
        It could also kill you.
      </p>
      <p>
        (turn page?)
      </p>
*/
