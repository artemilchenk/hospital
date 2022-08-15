import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { CreateCardDto } from "./dto/card.dto";
import { CardService } from "./card.service";
import { ICard } from "./interfaces/card.interface";


@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post('create')
  @HttpCode(201)
  create(@Body() createCardDto: CreateCardDto): Promise<ICard> {
    return this.cardService.create(createCardDto)
  }

  @Delete(':id')
  @HttpCode(201)
  delete(@Param('id') id: string): Promise<string> {
    return this.cardService.delete(id)
  }

  @Get('all')
  findAll(): Promise<ICard[]> {
    return this.cardService.getAll()
  }

}

