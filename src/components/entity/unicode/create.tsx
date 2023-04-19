import { UnicodeEntityComponent } from "./unicode_entity";

export function createUnicodeEntity(unicode: string) {
  return function() {
    return <UnicodeEntityComponent unicode={unicode}/>;
  }
}
