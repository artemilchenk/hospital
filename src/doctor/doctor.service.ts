import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor, DoctorDocument } from "./schemas/doctor.schema";
import { IDoctor } from "./interfaces/doctor.interface";

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>) {
  }

  async findAll(): Promise<IDoctor[]> {
    const doctors = await this.doctorModel.find()
    return doctors as IDoctor[]
  }
}
