import { Mouse } from "./model/domain";

export function MouseView(props: { mouse: Mouse }) {
    return <div>Squeaks {props.mouse.lifetimeSqueaks}</div>
}