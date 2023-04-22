import { UnicodeSceneryComponent } from "./unicode_scenery";
import { UnicodeSceneryController } from "./unicode_scenery_controller";

export function createUnicodeScenery(unicode: string, fontSizeVmin: number) {
  const controller = new UnicodeSceneryController([fontSizeVmin, fontSizeVmin]);
  function Component() {
    return <UnicodeSceneryComponent
        fontSize={`${fontSizeVmin}vmin`}
        unicode={unicode}/>
  }
  return {
    Component,
    controller,
  };
}