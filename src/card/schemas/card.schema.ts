import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop()
  user_id: string;

  @Prop()
  doctor_id: string;

  @Prop()
  slot: string;

  @Prop()
  reminder: number[]
}

export const CardSchema = SchemaFactory.createForClass(Card);