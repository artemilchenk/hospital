import { Injectable } from '@nestjs/common';
import { IUser } from "./interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.userModel.find()
    return users as IUser[]
  }

}
