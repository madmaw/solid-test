import { delay } from "./delay";
import { FlattenedPromise, createFlattenedPromise } from "./flattened_promise";

export class AnimationCanceledError extends Error {

}

export class AnimationManager<T extends string> {
  private animations: Map<T, FlattenedPromise<void>> = new Map();

  constructor() {

  }

  startAndWaitForAnimation(t: T, timeoutMillis?: number): Promise<void> {
    this.maybeCancelAnimation(t);
    const animation = createFlattenedPromise<void>();
    this.animations.set(t, animation);
    return timeoutMillis != null
        ? Promise.race([animation.promise, delay(timeoutMillis)])
        : animation.promise;
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

  createAnimationEndCallback<E extends HTMLElement>(
      t: T,
      ref: E | undefined,
      animationName?: string,
  ) {
    return (e: AnimationEvent) => {
      if (ref != null && e.target === ref && (animationName == null || e.animationName === animationName)) {
        this.maybeCompleteAnimation(t);
      }
    };
  }

  createTransitionEndCallback<E extends HTMLElement>(
      t: T,
      ref: E | undefined,
  ) {
    return (e: TransitionEvent) => {
      if (ref != null && e.target === ref) {
        this.maybeCompleteAnimation(t);
      }
    };
  }

}
