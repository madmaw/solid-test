import { listDescriptor } from "./descriptor/list";
import { numberDescriptor } from "./descriptor/literals";
import { activeRecordDescriptor, valueRecordDescriptor } from "./descriptor/record";
import { signalDescriptor } from "./descriptor/signal";

export const mouseDescriptor = activeRecordDescriptor({
    lifetimeSqueaks: numberDescriptor,
}); 
export type Mouse = typeof mouseDescriptor.aMutable;
export type MouseState = typeof mouseDescriptor.aState; 

export const catDescriptor = activeRecordDescriptor({
    meows: numberDescriptor,
    deadMice: listDescriptor(
        mouseDescriptor,
    ),
});
export type Cat = typeof catDescriptor.aMutable;
export type CatState = typeof catDescriptor.aState;

export const gameDescriptor = valueRecordDescriptor({
    creationTimestamp: numberDescriptor,
    lastUpdatedTimestamp: signalDescriptor(numberDescriptor),
});
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;
