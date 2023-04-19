import { Card, CardFaceType, CardSlot, Effect, Game } from "model/domain";
import { allCardSlots } from "./games";
import { UnreachableError } from "base/unreachable_error";
import { ControllerManger } from "components/component_manager";
import { CardController } from "components/card/card_controller";

export function cardFace(card: Card, peeking: boolean) {
  const faces = card.definition.faces; 
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

export function calculateCardEffects(card: Card, cardControllerManger: ControllerManger<Card, CardController> | undefined): {
  cost: readonly Effect[],
  benefit: readonly Effect[],
} {
  const face = cardFace(card, !!cardControllerManger?.lookupController(card)?.isPeeking());
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

export function calculateCardEffectUsages(game: Game, card: Card, cardControllerManger: ControllerManger<Card, CardController> | undefined): EffectUsages {

  const cardSlots = allCardSlots(game);

  // find the slot
  const cardSlot = cardSlots.find(cardSlot => {
    return cardSlot.targetCard === card
        || cardSlot.playedCards.some(c => c === card);
  });

  // if the card isn't in a slot return the values are unused
  if (cardSlot == null || cardSlot.targetCard == null) {
    const {
      cost,
      benefit
    } = calculateCardEffects(card, cardControllerManger);
  
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

  if (card === cardSlot.targetCard) {
    // it's the target card
    return calculateTargetCardEffectUsages(cardSlot, cardControllerManger);
  } else {
    // it's a played card
    const { cost: targetCardCost } = calculateCardEffects(cardSlot.targetCard, undefined);
    const remainingCosts = targetCardCost.reduce((acc, effect) => {
      const count = acc.get(effect) || 0;
      acc.set(effect, count + 1);
      return acc;
    }, new Map<Effect, number>);
    // iterate through until we find our card
    for(const playedCard of cardSlot.playedCards) {
      const { cost: playedCardCost, benefit: playedCardBenefit } = calculateCardEffects(playedCard, undefined);
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

export function calculateTargetCardEffectUsages(cardSlot: CardSlot, cardControllerManger: ControllerManger<Card, CardController> | undefined): EffectUsages {
  const playedCardEffectTotals = calculatePlayedCardEffectTotals(cardSlot, cardControllerManger);
  const targetCard = cardSlot.targetCard;
  if (targetCard == null) {
    return {
      cost: [],
      benefit: [],
    };
  }
  const { cost, benefit } = calculateCardEffects(targetCard, cardControllerManger);
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
