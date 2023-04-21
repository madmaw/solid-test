import { Accessor } from "solid-js";
import { delay } from "../../base/delay";
import { FlattenedPromise, createFlattenedPromise } from "../../base/flattened_promise";

export class AnimationCanceledError extends Error {

}

export class AnimationManager<T> {
  private animations: Map<T, FlattenedPromise<void>> = new Map();

  constructor() {

  }

  waitForAnimation(t: T, timeoutMillis: number = 700): Promise<void> {
    this.maybeCancelAnimation(t);
    const animation = createFlattenedPromise<void>();
    this.animations.set(t, animation);
    return Promise.race([animation.promise, delay(timeoutMillis)]);
  }

  maybeCancelAnimation(t: T) {
    const flattenedPromise = this.animations.get(t);
    if (flattenedPromise) {
      flattenedPromise.reject(new AnimationCanceledError());
      this.animations.delete(t);
    }
  }

  maybeCompleteAnimation(t: T) {
    const flattenedPromise = this.animations.get(t);
    if (flattenedPromise) {
      flattenedPromise.resolve();
      this.animations.delete(t);
    }
  }

  createAnimationEndEventListener(
      ref: Accessor<EventTarget | undefined>,
      animationIdAndName: Accessor<[T, string]>,
  ) {
    return (e: AnimationEvent) => {
      const [id, name] = animationIdAndName();
      if (e.target != null && ref() === e.target && e.animationName === name) {
        this.maybeCompleteAnimation(id);
      }
    };
  }

  createTransitionEndEventListener(
    ref: Accessor<EventTarget | undefined>,
    animationId: Accessor<T>,
    ) {
    return (e: TransitionEvent) => {
      if (e.target != null && ref() === e.target) {
        this.maybeCompleteAnimation(animationId());
      }
    };
  }

  createCutoutPoppedUpOrDownCallback(
    poppedUpValue: T,
    poppedDownValue: T = poppedUpValue,
  ) {
    return (poppedUp: boolean) => {
      this.maybeCompleteAnimation(poppedUp ? poppedUpValue : poppedDownValue);
    };
  }
}
