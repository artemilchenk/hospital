import { Body, Controller, Get} from "@nestjs/common";
import { IDoctor } from "../../dist/doctor/interfaces/cardinterface";
import { DoctorService } from "./doctor.service";


@Controller("doctor")
export class DoctorController {
  constructor(private doctorService: DoctorService) {
  }

  @Get("all")
  findAll(): Promise<IDoctor[]> {
    return this.doctorService.findAll();
  }
}
