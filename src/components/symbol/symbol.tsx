import { SymbolType } from "model/domain";
import { SymbolDamageSVGComponent } from "./damage.svg";
import { SymbolFinesseSVGComponent } from "./finesse.svg";
import { SymbolForceSVGComponent } from "./force.svg";
import { SymbolMindSVGComponent } from "./mind.svg";
import { SymbolSVGComponent, SymbolProps } from "./symbol.svg";
import { Dynamic } from "solid-js/web";
import { Component } from "solid-js";

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

const symbolComponents: Record<SymbolType, Component<SymbolProps>> = {
  [SymbolType.Force]: SymbolForceComponent,
  [SymbolType.Finesse]: SymbolFinesseComponent,
  [SymbolType.Mind]: SymbolMindComponent,
  [SymbolType.Magic]: () => <>{'R'}</>,
  [SymbolType.Damage]: SymbolDamageComponent,
  [SymbolType.Age]: () => <>{'⌛'}</>,
  [SymbolType.Fire]: () => <>{'M'}</>,
  [SymbolType.Draw]: () => <>{'G'}</>,
  [SymbolType.Poison]: () => <>{'☠'}</>,
  [SymbolType.Healing]: () => <>{'♥'}</>
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