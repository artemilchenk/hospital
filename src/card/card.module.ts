import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schemas/card.schema";
import { Doctor, DoctorSchema } from "../doctor/schemas/doctor.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
