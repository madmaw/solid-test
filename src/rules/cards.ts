import { Card, CardFace, CardFaceType, CardSlot, Effect, Game } from "model/domain";
import { allCardSlots } from "./games";
import { UnreachableError } from "base/unreachable_error";
import { ControllerManger } from "components/component_manager";
import { CardController } from "components/card/card_controller";
import { arrayRandomize } from "base/arrays";

export function cardFace(card: Card, peeking: boolean) {
  const faces = card.faces; 
  return faces[(card.visibleFaceIndex + (peeking ? 1 : 0))%faces.length];
}

export type EffectUsage = {
  effect: Effect,
  used: boolean,
};

export type EffectUsages = {
  cost: readonly EffectUsage[],
  benefit: readonly EffectUsage[],
};

export function calculateCardEffects(face: CardFace): {
  cost: readonly Effect[],
  benefit: readonly Effect[],
} {
  switch (face.type) {
    case CardFaceType.Resource:
      return {
        cost: face.cost,
        benefit: face.benefit,
      };
    case CardFaceType.Choice:
      return {
        cost: face.cost,
        benefit: face.benefit,
      };
    case CardFaceType.ResourceBack:
      return {
        cost: face.cost,
        benefit: [],
      };
    case CardFaceType.ChoiceBack:
      return {
        cost: face.cost,
        benefit: [],
      };
    default: 
      throw new UnreachableError(face);
  }
}

export function cardSlotForCard(game: Game, card: Card) {
  const cardSlots = allCardSlots(game);
  return cardSlots.find(cardSlot => {
    return cardSlot.targetCard === card
        || cardSlot.playedCards.some(c => c === card);
  });
}

export function calculateCardEffectUsages(game: Game, card: Card, cardControllerManger: ControllerManger<Card, CardController> | undefined): EffectUsages {

  const face = cardFace(card, !!cardControllerManger?.lookupController(card)?.isPeeking());
  // find the slot
  const cardSlot = cardSlotForCard(game, card);
  const targetCard = cardSlot?.targetCard;

  // if the card isn't in a slot return the values are unused
  if (cardSlot == null || targetCard == null) {
    const {
      cost,
      benefit
    } = calculateCardEffects(face);
  
    return {
      cost: cost.map(effect => ({
        effect,
        used: cardSlot != null,
      })),
      benefit: benefit.map(effect => ({
        effect,
        used: cardSlot != null,
      })),
    };
  }

  if (card === targetCard) {
    // it's the target card
    return calculateTargetCardEffectUsages(face, cardSlot, cardControllerManger);
  } else {
    // it's a played card
    const targetFace = cardFace(targetCard, !!cardControllerManger?.lookupController(targetCard)?.isPeeking());
    const { cost: targetCardCost } = calculateCardEffects(targetFace);
    const remainingCosts = targetCardCost.reduce((acc, effect) => {
      const count = acc.get(effect) || 0;
      acc.set(effect, count + 1);
      return acc;
    }, new Map<Effect, number>);
    // iterate through until we find our card
    for(const playedCard of cardSlot.playedCards) {
      const playedFace = cardFace(playedCard, false);
      const { cost: playedCardCost, benefit: playedCardBenefit } = calculateCardEffects(playedFace);
      const playedCardBenefitUsages = playedCardBenefit.map(effect => {
        const remainingCost = remainingCosts.get(effect) || 0;
        remainingCosts.set(effect, remainingCost - 1);
        return {
          effect,
          used: remainingCost > 0,
        };
      });

      if (playedCard === card) {
        const playedCardCostUsages = playedCardCost.map(effect => ({
          effect,
          used: true,
        }));
        return {
          cost: playedCardCostUsages,
          benefit: playedCardBenefitUsages,
        }
      }
    }
  }
  // should never happen
  return {
    cost: [],
    benefit: [],
  };
}

export function calculateTargetCardEffectUsages(
    targetCardFace: CardFace,
    cardSlot: CardSlot,
    cardControllerManger: ControllerManger<Card, CardController> | undefined,
): EffectUsages {
  const playedCardEffectTotals = calculatePlayedCardEffectTotals(
      cardSlot, cardControllerManger
  );
  const { cost, benefit } = calculateCardEffects(targetCardFace);
  const costUsages = cost.map<EffectUsage>(effect => {
    const total = playedCardEffectTotals.get(effect) || 0;
    playedCardEffectTotals.set(effect, total - 1);
    return {
      effect,
      used: total > 0,
    };
  }) || [];
  const benefitUsages = benefit.map(effect => ({
    effect,
    used: false,
  }));
  return {
    cost: costUsages,
    benefit: benefitUsages,
  };
}

function calculatePlayedCardEffectTotals(cardSlot: CardSlot, cardControllerManger: ControllerManger<Card, CardController> | undefined): Map<Effect, number> {
  return cardSlot.playedCards.reduce((acc, card) => {
    const face = cardFace(card, !!cardControllerManger?.lookupController(card)?.isPeeking());
    if (face.type === CardFaceType.Resource) {
      return face.benefit.reduce((acc, effect) => {
        const count = acc.get(effect) || 0;
        acc.set(effect, count+1);
        return acc;
      }, acc);
    }
    return acc;
  }, new Map<Effect, number>());
}

export function sortCardsByRecycling(cards: readonly Card[]): readonly Card[] {
  const randomizedCards = arrayRandomize(cards);
  return [...randomizedCards].sort((c1, c2) => {
    // reverse, decks are drawn from the back
    return (c2.recyclePosition || 9) - (c1.recyclePosition || 9);
  });
}