import { CardSlot } from "model/domain";
import { CardSlotComponent as CardSlotComponentImpl } from "./card_slot";
import { CardSlotsComponent } from "./card_slots";

export function createCardSlots() {
  function CardSlotComponent(props: { cardSlot: CardSlot }) {
    const CardSlotComponent = createCardSlot(props);
    return <CardSlotComponent/>;
  }
  
  const Component = (props : {
    cardSlots: readonly CardSlot[],
  }) => {
    return (
      <CardSlotsComponent
        CardSlotComponent={CardSlotComponent}
        cardSlots={props.cardSlots}/>
    );
  };
  return {
    Component,
  };
}

function createCardSlot({ cardSlot }: { cardSlot: CardSlot }) {
  return () => <CardSlotComponentImpl TargetCard={undefined}/>;
}
