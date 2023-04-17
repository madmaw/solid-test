import { Card } from "model/domain";

export function cardFace(card: Card, offset = 0) {
  const faces = card.type.faces; 
  return faces[(card.visibleFaceIndex + offset)%faces.length];
}
