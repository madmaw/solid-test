import { CardFace } from "model/domain";

export interface EntityController {
  perform(face: CardFace): Promise<void>;

  appear(): Promise<void>;

  disappear(): Promise<void>;

  takeDamage(): Promise<void>;

  die(): Promise<void>;
}
