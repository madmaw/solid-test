import { BookSpread, BookSpreadRoom, BookSpreadTableOfContents, BookSpreadType } from "model/domain";
import { Component } from "solid-js";
import { Animations, PageSide, PageUI } from "./page_controller";
import { Dynamic } from "solid-js/web";
import { PageToCComponent } from "./toc/page_toc";
import { PageRoomComponent } from "./room/page_room";
import { AnimationManager } from "ui/animation/animation_manager";

export type PageProps<T extends BookSpread = BookSpread> = {
  animations: AnimationManager<Animations>
  spread: T,
  pageUI: PageUI,
  side: PageSide,
};

const pageComponents: { [K in BookSpreadType]: Component<PageProps>} = {
  [BookSpreadType.Room]: function (props: PageProps) {
    return <PageRoomComponent
        animations={props.animations}
        spread={props.spread as BookSpreadRoom}
        pageUI={props.pageUI}
        side={props.side}/>;
  },
  [BookSpreadType.TableOfContents]: function (props: PageProps) {
    return <PageToCComponent
        animations={props.animations}
        spread={props.spread as BookSpreadTableOfContents}
        pageUI={props.pageUI}
        side={props.side}/>
  },
}

export function PageComponent(props: PageProps) {
  return (
    <Dynamic
        component={pageComponents[props.spread.type]}
        animations={props.animations}
        spread={props.spread}
        pageUI={props.pageUI}
        side={props.side}/>
  )
}


