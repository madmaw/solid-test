import { For, render } from "solid-js/web";
import { CountView } from "./count";
import { activeRecordDescriptor } from "./model/descriptor/record";
import { listDescriptor } from "./model/descriptor/list";
import { numberDescriptor } from "./model/descriptor/literals";
import { valueRecordDescriptor } from "./model/descriptor/record";
import { signalDescriptor } from "./model/descriptor/signal";

const mouseDescriptor = valueRecordDescriptor({
    lifetimeSqueaks: signalDescriptor(numberDescriptor),
}); 

const catDescriptor = activeRecordDescriptor({
    meows: numberDescriptor,
    deadMice: listDescriptor(
        mouseDescriptor,
    ),
});
const cat = catDescriptor.create({
    meows: 1,
    deadMice: [{
        lifetimeSqueaks: 2,
    }],
});

window.onload = function() {
    const app = document.getElementById('app')!;
    render(() => <div>
        <CountView count={cat.meows}/>
        <For each={cat.deadMice}>
            {mouse => {
                return <CountView count={mouse.lifetimeSqueaks[0]()}/>
            }}
        </For>
    </div>, app);
};

window.setInterval(() => {
    cat.meows = cat.meows + 1;
}, 1000);

window.setInterval(() => {
    const mouse = mouseDescriptor.create({
        lifetimeSqueaks: Math.floor(Math.random() * 100),
    });
    cat.deadMice = [...cat.deadMice, mouse];
}, 2500);

window.setInterval(() => {
    const mouse = cat.deadMice[Math.floor(Math.random() * cat.deadMice.length)];
    mouse.lifetimeSqueaks[1](mouse.lifetimeSqueaks[0]() + 1);
}, 300);
