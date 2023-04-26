import { DamageUp, Magic, Perception } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackFireball: CardBackResource = {
  name: 'fireball',
  description: 'You suddenly feel hot.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic, Magic],
};
const cardFrontFireball: CardFrontResource = {
  name: 'fireball',
  description: 'Fire! Ball!!!',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [DamageUp, DamageUp, DamageUp, Perception],
};
export const cardDefinitionFireball: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 4,
  faces: [cardBackFireball, cardFrontFireball],
};
export const cardFireball = cardDescriptor.freeze({
  ...cardDefinitionFireball,
  visibleFaceIndex: 0,
});
