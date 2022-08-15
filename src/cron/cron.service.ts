import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card, CardDocument } from "../card/schemas/card.schema";
import { Model } from "mongoose";
import { Doctor, DoctorDocument } from "../doctor/schemas/doctor.schema";
import { User, UserDocument } from "../user/schemas/user.schema";
import * as moment from "moment";
import { Cron } from "@nestjs/schedule";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class CronService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>,
              @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
              @InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  @Cron("* * * * *")
  async handleCron() {
    const cards = await this.cardModel.find();
    //розраховуємо скільки часу залишилось до прийому(різниця від теперішнього часу до часу на прийом до лікаря)
    cards.map(async (card) => {
      let timer = moment(card.slot).diff(new Date(), "minutes");

      //перевіряємо чи дата сповіщення пацаєнта співпадає з даним часом
      if (card.reminder.includes(timer)) {

        //знаходимо лікаря з по id з картки
        const doctor = await this.doctorModel.findById(card.doctor_id);

        //знаходимо пацієнта з по id з картки
        const user = await this.userModel.findById(card.user_id);

        //взалежності від залишеного часу формуємо меседж до пацієнта
        let message = timer === 5
          ? `Привет, ${user?.name}! Напоминаем что вы записаны к ${doctor?.name} завтра в ${moment(card?.slot).format("HH:mm")}!`
          : timer === 3 ? `Привет, ${user?.name}! Вам через 2 часа к ${doctor?.name} в ${moment(card?.slot)}!` : null;
        console.log(message);

        //якщо в залишений час співпадає з одним із заданих проміжкві, заданим умовою задачі(24 години, 2 години)
        //записуємо сповіщення користувачу в вайл hospital.txt
        if (card.reminder.includes(timer)) {
          console.log("fs...");
          await fs.readFile(path.join(__dirname, "..", "..", "hospital.txt"), "utf8", async (error, data) => {
            console.log(data);
            await fs.writeFile(path.join(__dirname, "..", "..", `hospital.txt`), `${data}${message}\n`, () => {
            });
          });
        }

        //проміжок часу(24, 2 години) який співпав з теперішнім часом тепер можна видалити з картки
        if (card.reminder.length) {
          await this.cardModel.findByIdAndUpdate(card._id, { reminder: card.reminder.filter(r => r !== timer) });
        }
      }
      //якщо в картці вже не залишилось проміжків часу (24, 2 години) а значить нагадувати про прийом до лікарая
      //пацієнта ми вже не будемо то тепер її можна видалити як викристану
      if (!card.reminder.length) {
        const cardDocument = await this.cardModel.findById(card._id);
        await cardDocument.delete();

        //знаходимо лікаря по id з видаленої картки
        const doctor = await this.doctorModel.findById(card.doctor_id);

        //якщо є такий лікар, помічаємо дату з видаленої картки в масиві об`єкта лікаря як звільнену
        if (doctor) {
          const slotsUpdated = doctor.slots.map(sl => {
            if (sl.date === card.slot) return { ...sl, taken: false };
            return sl;
          });
          await this.doctorModel.findByIdAndUpdate(card.doctor_id, { slots: slotsUpdated });
        }
      }
    });

  }
}
