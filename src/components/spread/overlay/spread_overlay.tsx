import { BookSpread, BookSpreadRoom, BookSpreadType, CardSlot } from "model/domain";
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { SpreadOverlayRoomComponent } from "./room/spread_overlay_room";
import { SpreadOverlayBlankComponent } from "./blank/spread_overlay_blank";

export type SpreadOverlayProps<T extends BookSpread = BookSpread> = {
  spread: T,
  CardSlotsComponent: Component<{ model: readonly CardSlot[] }>,
};

const spreadComponents: { [K in BookSpreadType]: Component<SpreadOverlayProps>} = {
  [BookSpreadType.Room]: function (props: SpreadOverlayProps) {
    return <SpreadOverlayRoomComponent
        spread={props.spread as BookSpreadRoom}
        CardSlotsComponent={props.CardSlotsComponent}/>;
  },
  [BookSpreadType.TableOfContents]: SpreadOverlayBlankComponent,
}

export function SpreadOverlayComponent(props: SpreadOverlayProps) {
  return (
    <Dynamic
        component={spreadComponents[props.spread.type]} 
        spread={props.spread}
        CardSlotsComponent={props.CardSlotsComponent}/>
  )
}