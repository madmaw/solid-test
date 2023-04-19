import { UnicodeEntityComponent } from "./unicode_entity";

export function createUnicodeEntity(unicode: string) {
  return (
    <UnicodeEntityComponent unicode={unicode}/>
  );
}