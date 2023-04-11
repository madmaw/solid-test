import { render } from "solid-js/web";
import { Table } from "components/table/table";
import { createSignal } from "solid-js";
import { Book } from "components/book/book";

window.onload = function () {
    const app = document.getElementById('app')!;
    const [flat, setFlat] = createSignal(false);
    render(() => <Table Book={Book} flat={flat()}/>, app);
    setTimeout(() => {
        setFlat(true);
    }, 1000);
};
