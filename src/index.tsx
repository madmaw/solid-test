import { render } from "solid-js/web";
import { CountView } from "./view/count";
import { listDescriptor } from "./model/descriptor/list";
import { numberDescriptor } from "./model/descriptor/literals";
import { recordDescriptor } from "./model/descriptor/record";
import { signalDescriptor } from "./model/descriptor/signal";
import { App } from "./view/app";

const catDescriptor = recordDescriptor({
    meows: signalDescriptor(numberDescriptor),
    mice: signalDescriptor(
        listDescriptor(
            recordDescriptor({
                squeaks: signalDescriptor(numberDescriptor),
            }),
        ),
    ),
});
const cat = catDescriptor.create({
    meows: 1,
    mice: [{
        squeaks: 2,
    }],
});

window.onload = function () {
    const app = document.getElementById('app')!;
    render(() => <App />, app);
};

window.setInterval(() => {
    const meows = cat.meows[0]();
    cat.meows[1](meows + 1);
}, 1000)
