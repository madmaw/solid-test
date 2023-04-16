import { BookSpread, BookSpreadRoom, BookSpreadType, CardSlot } from "model/domain";
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { AnimationManager } from "ui/animation/animation_manager";
import { SpreadRoomComponent } from "./room/spread_room";
import { SpreadBlankComponent } from "./blank/spread_blank";
import { Animations } from "./spread_controller";

export type SpreadProps<T extends BookSpread = BookSpread> = {
  animations: AnimationManager<Animations>,
  spread: T,
  CardSlotsComponent: Component<{ model: readonly CardSlot[] }>,
};

const spreadComponents: { [K in BookSpreadType]: Component<SpreadProps>} = {
  [BookSpreadType.Room]: function (props: SpreadProps) {
    return <SpreadRoomComponent
        animations={props.animations}
        spread={props.spread as BookSpreadRoom}
        CardSlotsComponent={props.CardSlotsComponent}/>;
  },
  [BookSpreadType.TableOfContents]: SpreadBlankComponent,
}

export function SpreadComponent(props: SpreadProps) {
  return (
    <Dynamic
        component={spreadComponents[props.spread.type]} 
        animations={props.animations}
        spread={props.spread}
        CardSlotsComponent={props.CardSlotsComponent}/>
  )
}