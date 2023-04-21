import { UnicodeEntityComponent } from "./unicode_entity";

export function createUnicodeEntity(unicode: string, fontSize?: string) {
  return function() {
    return (
        <UnicodeEntityComponent
            unicode={unicode}
            fontSize={fontSize}
            />
    );
  }
}
