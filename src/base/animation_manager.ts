import { delay } from "./delay";
import { FlattenedPromise, createFlattenedPromise } from "./flattened_promise";

export class AnimationCanceledError extends Error {

}

export class AnimationManager<T> {
  private animations: Map<T, FlattenedPromise<void>> = new Map();
  private animationEndCallbackCache = new WeakMap<HTMLElement, Map<T, Map<string, (e: AnimationEvent) => void>>>();
  private transitionEndCallbackCache = new WeakMap<HTMLElement, Map<T, (e: TransitionEvent) => void>>();

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

  createAnimationEndCallback<E extends HTMLElement>(
      t: T,
      ref: E | undefined,
      animationName: string,
  ) {
    if (ref == null) {
      return;
    }
    const elementMap: Map<T, Map<string, (e: AnimationEvent) => void>> =
        this.animationEndCallbackCache.get(ref) || new Map();
    const tMap: Map<string, (e: AnimationEvent) => void> = 
        elementMap.get(t) || new Map();
    const cachedCallback = tMap.get(animationName);
    if (cachedCallback != null) {
      return cachedCallback;
    }
    const callback = (e: AnimationEvent) => {
      if (e.target === ref && (animationName == null || e.animationName === animationName)) {
        this.maybeCompleteAnimation(t);
      }
    };
    this.animationEndCallbackCache.set(ref, elementMap);
    elementMap.set(t, tMap);
    tMap.set(animationName, callback);
    return callback;
  }

  createTransitionEndCallback<E extends HTMLElement>(
      t: T,
      ref: E | undefined,
  ) {
    if (ref == null) {
      return;
    }
    const elementMap: Map<T, (e: TransitionEvent) => void> =
        this.animationEndCallbackCache.get(ref) || new Map();
    const cachedCallback = elementMap.get(t);
    if (cachedCallback != null) {
      return cachedCallback;
    }
    const callback = (e: TransitionEvent) => {
      if (e.target === ref) {
        this.maybeCompleteAnimation(t);
      }
    };
    this.transitionEndCallbackCache.set(ref, elementMap);
    elementMap.set(t, callback);
    return callback;
  }
}
