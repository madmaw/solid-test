import { Age, DamageDown, Draw, Magic } from "data/effects";
import {
  CardBackResource,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardFrontResource,
  RecycleTarget,
  SymbolType,
  cardDescriptor,
} from "model/domain";

const cardBackMagicHaste: CardBackResource = {
  name: 'haste',
  description: 'The world slows down.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicHaste: CardFrontResource = {
  name: 'haste',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [Draw, Age, Draw],
  benefit: [DamageDown, DamageDown],
};
export const cardDefinitionMagicHaste: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 6,
  faces: [cardBackMagicHaste, cardFrontMagicHaste],
};
export const cardMagicHaste = cardDescriptor.freeze({
  ...cardDefinitionMagicHaste,
  visibleFaceIndex: 0,
});
