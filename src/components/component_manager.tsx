import { Component } from "solid-js"

export type ComponentAndController<ComponentProps, Controller> = {
  controller: Controller,
  Component: Component<ComponentProps>,
};

export class ComponentManager<Model extends object, Controller, ComponentProps = {}> {
  private cache = new WeakMap<Model, ComponentAndController<ComponentProps, Controller>>();

  readonly FactoryComponent = (props: { model: Model } & ComponentProps) => {
    const Component = this.lookupOrCreateComponent(props.model);
    return <Component {...props}/>;
  };

  constructor(
    private readonly factory: (model: Model) => ComponentAndController<ComponentProps, Controller>
  ) {}

  private lookupOrCreate(model: Model): ComponentAndController<ComponentProps, Controller> {
    let result = this.cache.get(model);
    if (result == null) {
      result = this.factory(model);
      this.cache.set(model, result);
    }
    return result;
  }

  lookupOrCreateComponent(model: Model): Component<ComponentProps> {
    return this.lookupOrCreate(model).Component;
  }

  lookupController(model: Model): Controller | undefined {
    return this.cache.get(model)?.controller;
  }
}