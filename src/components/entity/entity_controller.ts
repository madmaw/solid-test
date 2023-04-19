import { CardFace } from "model/domain";

export interface EntityController {
  perform(face: CardFace): Promise<void>;
}