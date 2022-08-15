import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ISlot } from "../interfaces/doctor.interface";

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop()
  name: string;

  @Prop()
  spec: string;

  @Prop()
  slots: ISlot[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);