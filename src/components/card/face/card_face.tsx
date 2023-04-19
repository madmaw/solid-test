import { CardBackgroundType, CardDefinition, CardFace, CardFaceChoice, CardFaceChoiceBack, CardFaceResource, CardFaceResourceBack, CardFaceType, CardForegroundType } from "model/domain";
import styles from './card_face.module.scss';
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { CardFaceResourceComponent } from "./card_face_resource";
import { CardFaceResourceBackComponent } from "./card_face_resource_back";
import { CardFaceChoiceComponent } from "./card_face_choice";
import { CardFaceChoiceBackComponent } from "./card_face_choice_back";
import { EffectUsage } from "rules/cards";
import { EffectStripComponent } from "components/effect/effect_strip";


const cardFaceComponents: { [K in CardFaceType]: Component<CardFaceProps>} = {
  [CardFaceType.Resource]: function (props: CardFaceProps) {
    return <CardFaceResourceComponent
        face={props.face as CardFaceResource}
        definition={props.definition}/>;
  },
  [CardFaceType.ResourceBack]: function (props: CardFaceProps) {
    return <CardFaceResourceBackComponent
        face={props.face as CardFaceResourceBack}
        definition={props.definition}/>;
  },
  [CardFaceType.Choice]: function (props: CardFaceProps) {
    return <CardFaceChoiceComponent
        face={props.face as CardFaceChoice}
        definition={props.definition}/>;
  },
  [CardFaceType.ChoiceBack]: function (props: CardFaceProps) {
    return <CardFaceChoiceBackComponent
        face={props.face as CardFaceChoiceBack}/>;
  },
}

type CardFaceProps = {
  face: CardFace
  definition: CardDefinition,
};

export function CardFaceComponent(props: CardFaceProps & {
  cost: readonly EffectUsage[],
  benefit: readonly EffectUsage[],
}) {
  return (
    <div classList={{
      [styles['card-face']]: true,
      // backgrounds
      [styles.background]: true,
      [styles.clear]: props.face.background === CardBackgroundType.Clear,
      [styles.crosshatched]: props.face.background === CardBackgroundType.Crosshatched,
      [styles.door]: props.face.background === CardBackgroundType.Door,
      [styles.passageway]: props.face.background === CardBackgroundType.Passageway,
      // foregrounds
      [styles.foreground]: props.face.foreground != null,
      [styles.rat]: props.face.foreground === CardForegroundType.Rat,
      [styles.trap]: props.face.foreground === CardForegroundType.Trap,
      [styles.fountain]: props.face.foreground === CardForegroundType.Fountain,
    }}>
      <EffectStripComponent effects={props.benefit}/>
      <Dynamic
          component={cardFaceComponents[props.face.type]}
          face={props.face}
          definition={props.definition}/>
      <EffectStripComponent effects={props.cost}/>
    </div>
  );
}
