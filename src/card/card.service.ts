import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/card.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Card, CardDocument } from "./schemas/card.schema";
import { Model } from "mongoose";
import { Doctor, DoctorDocument } from "../doctor/schemas/doctor.schema";
import { User, UserDocument } from "../user/schemas/user.schema";
import { ICard } from "./interfaces/card.interface";

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>,
              @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
              @InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async create(createCardDto: CreateCardDto): Promise<ICard> {

    //знаходимо лікаря в бд по id з картки
    const doctor = await this.doctorModel.findById(createCardDto.doctor_id);
    if (!doctor) {
      throw new HttpException("Такий лікарь в нас не працює", HttpStatus.BAD_REQUEST);
    }

    //знаходимо пацієнта в бд по id з картки
    const user = await this.userModel.findById(createCardDto.user_id);
    if (!user) {
      throw new HttpException("Такий пацієнт не зареєстрований", HttpStatus.BAD_REQUEST);
    }

    //перевіряємо чи дата, вказана в картці, існує в масиві пропонованих дат в об`єкті лікаря
    const isDate = doctor.slots.find(sl => sl.date === createCardDto.slot);
    if (isDate) {
      //перевіряємо чи вказана дата не зарезервована
      const isTaken = doctor.slots.find(sl => {
        if (sl.date === createCardDto.slot && sl.taken) return sl;
        return false;
      });
      if (isTaken) {
        throw new HttpException("Цей час вже зарезервований", HttpStatus.BAD_REQUEST);
      }
      //записуємо обьект картки в бд
      const newCard = await new this.cardModel({ ...createCardDto, reminder: [1440, 120] });
      await newCard.save();

      //помічаємо дату як зарезервовану в масиві об`єкта лікаря
      const slotsUpdated = doctor.slots.map(sl => {
        if (sl.date === createCardDto.slot) return { ...sl, taken: true };
        return sl;
      });
      await this.doctorModel.findByIdAndUpdate(createCardDto.doctor_id, { slots: slotsUpdated });

      //повертаємо картку
      return newCard;
    } else {
      throw new HttpException("Ви вказали невірну дату", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id): Promise<string> {

    //перевіряємо чи є така картка по заданому id
    const isCard = await this.cardModel.findById(id);
    if (isCard) {
      //якщо то видаляємо картку
      await isCard.delete();
    }

    //знаходимо лікаря по id з видаленої картки
    const doctor = await this.doctorModel.findById(isCard.doctor_id);

    //якщо є такий лікар, помічаємо дату з видаленої картки в масиві об`єкта лікаря як звільнену
    if (doctor) {
      const slotsUpdated = doctor.slots.map(sl => {
        if (sl.date === isCard.slot) return { ...sl, taken: false };
        return sl;
      });
      await this.doctorModel.findByIdAndUpdate(isCard.doctor_id, { slots: slotsUpdated });
    }

    return id;
  }

  async getAll(): Promise<ICard[]> {
    const cards = await this.cardModel.find();
    return cards;
  }

}
