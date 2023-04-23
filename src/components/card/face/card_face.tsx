import { CardBackgroundType, CardDefinition, CardFace, CardFaceType, CardForegroundType, SymbolType } from "model/domain";
import styles from './card_face.module.scss';
import { EffectUsage } from "rules/cards";
import { EffectStripComponent } from "components/effect/effect_strip";
import { CardFaceDescriptionComponent } from "./card_face_description";
import { CardFaceNameComponent } from "./card_face_name";
import { SymbolComponent } from "components/symbol/symbol";


type CardFaceProps = {
  face: CardFace
  definition: CardDefinition,
  warning: boolean,
};

export function CardFaceComponent(props: CardFaceProps & {
  cost: readonly EffectUsage[],
  benefit: readonly EffectUsage[],
}) {
  return (
      <div classList={{
        [styles.container]: true,
        // backgrounds
        [styles.background]: true,
        [styles.clear]: props.face.background === CardBackgroundType.Clear,
        [styles.crosshatched]: props.face.background === CardBackgroundType.Crosshatched,
        [styles.door]: props.face.background === CardBackgroundType.Door,
        [styles.passageway]: props.face.background === CardBackgroundType.Passageway,
        [styles.forest]: props.face.background === CardBackgroundType.ForestPath,
        [styles.darkened]: props.face.background === CardBackgroundType.DarkenedForestPath,
        [styles.finesse]: props.face.symbol === SymbolType.Finesse,
        [styles.force]: props.face.symbol === SymbolType.Force,
        [styles.mind]: props.face.symbol === SymbolType.Mind,
      }}>
        {props.face.symbol != null && (
            <div class={styles.symbol}>
              <SymbolComponent
                  type={props.face.symbol}
                  fill="transparent"
                  stroke="white"
                  />
            </div>
        )}
        <div classList={{
          [styles['card-face']]: true,
          // foregrounds
          [styles.foreground]: props.face.foreground != null,
          [styles.rat]: props.face.foreground === CardForegroundType.Rat,
          [styles.trap]: props.face.foreground === CardForegroundType.Trap,
          [styles.fountain]: props.face.foreground === CardForegroundType.Fountain,
          [styles.tree]: props.face.foreground === CardForegroundType.MagicTree,
        }}>
          {props.face.type === CardFaceType.ChoiceBack
              || props.face.type === CardFaceType.ResourceBack
              ? <FlipArrow/>
              : <EffectStripComponent effects={props.benefit} warnUnused={false}/>} 
          <CardFaceDescriptionComponent>
            <CardFaceNameComponent name={props.face.name}/>
          </CardFaceDescriptionComponent>
          <EffectStripComponent effects={props.cost} warnUnused={props.warning}/>
        </div>
      </div>
  );
}

function FlipArrow() {
  return (
    <div class={styles.flip}>
      <svg viewBox="0 0 200 100">
        <g>
          <path d="M 10 70 A 120 120 0 0 1 180 70"/>
          <path d="M 180 50 L 180 70 L 160 70"/>
        </g>
      </svg>
    </div>
  );
}