import { BookSpread } from "model/domain";
import { Animations, PageController, PageSide, pageUIDescriptor } from "./page_controller";
import { AnimationManager } from "ui/animation/animation_manager";
import { PageComponent } from "./page";
import { ComponentManager } from "components/component_manager";

export function createPageManager({
  side,
}: {
  side: PageSide, 
}) {
  // might need a different controller per spread type?
  function createPage(spread: BookSpread) {
    const animations = new AnimationManager<Animations>();
    const pageUI = pageUIDescriptor.create({
      popped: false,
    });
    const controller = new PageController(pageUI, animations);
      
    const Component = () => (
      <PageComponent
          animations={animations}
          pageUI={pageUI}
          side={side}
          spread={spread}/>
    );
  
    return {
      controller,
      Component,
    }
  }
  return new ComponentManager(createPage);
}
