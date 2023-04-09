import { listDescriptor } from "./descriptor/list";
import { numberDescriptor } from "./descriptor/literals";
import { activeRecordDescriptor, valueRecordDescriptor } from "./descriptor/record";
import { signalDescriptor } from "./descriptor/signal";

export const gameDescriptor = valueRecordDescriptor({
    creationTimestamp: numberDescriptor,
    lastUpdatedTimestamp: signalDescriptor(numberDescriptor),
});
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;
