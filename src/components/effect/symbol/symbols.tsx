import { SymbolDamageSVGComponent } from "./damage.svg";
import { SymbolFinesseSVGComponent } from "./finesse.svg";
import { SymbolForceSVGComponent } from "./force.svg";
import { SymbolMindSVGComponent } from "./mind.svg";
import { SymbolSVGComponent, SymbolProps } from "./symbol.svg";

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