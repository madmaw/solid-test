import { Accessor, FlowProps, ParentProps, children } from "solid-js";
import { delay } from "../../base/delay";
import { FlattenedPromise, createFlattenedPromise } from "../../base/flattened_promise";

export class AnimationCanceledError extends Error {

}

export class AnimationManager<T> {
  private animations: Map<T, FlattenedPromise<void>> = new Map();

  constructor() {

  }

  startAndWaitForAnimation(t: T, timeoutMillis: number = 5000): Promise<void> {
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

  createAnimationEndCallback<K extends string, P extends Record<K, T>>(
      ref: Accessor<EventTarget | undefined>,
      key: K,
      props: P,
      valueToAnimationName: (value: T) => string,
  ) {
    return (e: AnimationEvent) => {
      const value = props[key];
      const animationName = valueToAnimationName(value);
      if (e.target != null && ref() === e.target && e.animationName === animationName) {
        this.maybeCompleteAnimation(value);
      }
    };
  }

  createTransitionEndEventListener<K extends string, P extends Record<K, T>>(
    ref: Accessor<EventTarget | undefined>,
    key: K,
    props: P,
  ) {
    return (e: TransitionEvent) => {
      if (e.target != null && ref() === e.target) {
        this.maybeCompleteAnimation(props[key]);
      }
    };
  }
}
