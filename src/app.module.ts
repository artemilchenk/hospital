import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { CardModule } from './card/card.module';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from "@nestjs/schedule";
import { CronModule } from './cron/cron.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        MongooseModule.forRoot('mongodb+srv://artem:03mern09@cluster0.vlsfh8k.mongodb.net/?retryWrites=true&w=majority'),
        CardModule,
        DoctorModule,
        UserModule,
        CronModule,
        ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
