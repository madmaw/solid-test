import { render } from "solid-js/web";
import { createHome } from "./pages/home/create";

window.onload = function() {
    const MainMenu = createHome({});
    const app = document.getElementById('app')!;
    render(() => (
        <MainMenu/>
    ), app);
};
