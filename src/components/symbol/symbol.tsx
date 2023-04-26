import { SymbolType } from "model/domain";
import { SymbolDamageSVGComponent } from "./damage.svg";
import { SymbolFinesseSVGComponent } from "./finesse.svg";
import { SymbolForceSVGComponent } from "./force.svg";
import { SymbolMindSVGComponent } from "./mind.svg";
import { SymbolSVGComponent, SymbolProps } from "./symbol.svg";
import { Dynamic } from "solid-js/web";
import { Component } from "solid-js";
import { SymbolMagicSVGComponent } from "./magic.svg";
import { SymbolDrawSVGComponent } from "./draw.svg";
import { SymbolPerceptionSVGComponent } from "./perception.svg";
import { SymbolYouthSVGComponent } from "./youth.svg";

export function SymbolForceComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolForceSVGComponent/>
    </SymbolSVGComponent>
  );
}

export function SymbolFinesseComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolFinesseSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolMindComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolMindSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolDamageComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolDamageSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolMagicComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolMagicSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolDrawComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolDrawSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolPerceptionComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolPerceptionSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolYouthComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolYouthSVGComponent/>
    </SymbolSVGComponent>
  )
}

export function SymbolAgeComponent(props: SymbolProps) {
  return (
    <SymbolSVGComponent fill={props.fill} stroke={props.stroke}>
      <SymbolYouthSVGComponent/>
    </SymbolSVGComponent>
  )
}

const symbolComponents: Record<SymbolType, Component<SymbolProps> | undefined> = {
  [SymbolType.Force]: SymbolForceComponent,
  [SymbolType.Finesse]: SymbolFinesseComponent,
  [SymbolType.Mind]: SymbolMindComponent,
  [SymbolType.Magic]: SymbolMagicComponent,
  [SymbolType.Damage]: SymbolDamageComponent,
  [SymbolType.Youth]: SymbolYouthComponent,
  [SymbolType.Age]: SymbolAgeComponent,
  [SymbolType.Perception]: SymbolPerceptionComponent,
  [SymbolType.Draw]: SymbolDrawComponent,
  [SymbolType.Poison]: () => <>{'☠'}</>,
  [SymbolType.Healing]: () => <>{'♥'}</>,
  [SymbolType.GainCards]: undefined,
  [SymbolType.LoseCards]: undefined,
  [SymbolType.GainMaxHealth]: () => <>{'+♡'}</>,
  [SymbolType.LoseMaxHealth]: () => <>{'-♡'}</>,
  [SymbolType.DoubleCard]: undefined,
  [SymbolType.Duplicate]: undefined,
};


export function SymbolComponent(props: SymbolProps & {
  type: SymbolType,
}) {
  return (
    <Dynamic
        component={symbolComponents[props.type]}
        {...props}
        />
  )
}