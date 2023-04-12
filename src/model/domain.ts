import { listDescriptor } from "./descriptor/list";
import { LiteralTypeDescriptor, booleanDescriptor, numberDescriptor, stringDescriptor } from "./descriptor/literals";
import { activeRecordDescriptor, valueRecordDescriptor } from "./descriptor/record";
import { signalDescriptor } from "./descriptor/signal";
import { discriminatingUnionDescriptor } from "./descriptor/union";

export const gameDescriptor = valueRecordDescriptor({
  creationTimestamp: numberDescriptor,
  lastUpdatedTimestamp: signalDescriptor(numberDescriptor),
});
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;


// test discriminating union
const aDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<'a'>(),
  num: numberDescriptor,
});
const bDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<'b'>(),
  bool: booleanDescriptor,
});
const aOrBDescriptor = discriminatingUnionDescriptor(
  {'a': aDescriptor, 'b': bDescriptor }, 
  aOrB => aOrB.type,
  aOrB => aOrB.type,
);
const aOrB = aOrBDescriptor.create({
  type: 'a',
  num: 1,
});
