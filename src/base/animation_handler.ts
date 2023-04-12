import { Accessor, Setter } from "solid-js";
import { FlattenedPromise, createFlattenedPromise } from "./flattened_promise";
import { delay } from "./delay";

export class AnimationInterruptedError extends Error {

}

export class AnimationHandler<T, E extends HTMLElement> {

  private animationPromise: FlattenedPromise<void> | undefined;

  constructor(
      private readonly accessor: Accessor<T>,
      private readonly setter: Setter<T>,
      private timeout: number = 5000,
  ) {

  }

  setValue(t: T): Promise<void> {
    if (this.accessor() != t) {
      this.setter(() => t);
      this.startAnimation();
    }
    return Promise.race([
      this.animationPromise?.promise || Promise.resolve(),
      delay(this.timeout)
    ]);
  }

  readonly elementReference = (ref: E) => {
    // TODO (chris.g) have some way to map values to animation names
    ref.addEventListener('animationend', (e: AnimationEvent) => {
      if (e.target === ref) {
        this.completeAnimation();
      }
    });
    ref.addEventListener('animationcancel', (e: AnimationEvent) => {
      if (e.target == ref) {
        this.interruptAnimation();
      }
    });
    ref.addEventListener('transitionend', (e: TransitionEvent) => {
      if (e.target === ref) {
        this.completeAnimation();
      }
    });
  }
  
  private startAnimation() {
    this.interruptAnimation();
    this.animationPromise = createFlattenedPromise();
  }

  private interruptAnimation() {
    if (this.animationPromise != null) {
      this.animationPromise.reject(new AnimationInterruptedError());
      this.animationPromise = undefined;
    }
  }

  private completeAnimation() {
    if (this.animationPromise != null) {
      this.animationPromise.resolve();
      this.animationPromise = undefined;
    }
  }
}
