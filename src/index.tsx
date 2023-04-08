import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { CountView } from "./count";

const [count, setCount] = createSignal(0);

window.onload = function() {
    const app = document.getElementById('app')!;
    render(() => <CountView count={count()}/>, app);
};

window.setInterval(() => {
    setCount(count() + 1);
}, 1000)
