import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "../card/schemas/card.schema";
import { Doctor, DoctorSchema } from "../doctor/schemas/doctor.schema";
import { User, UserSchema } from "../user/schemas/user.schema";
import { CronService } from "./cron.service";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [],
  providers: [CronService]
})
export class CronModule {

}
