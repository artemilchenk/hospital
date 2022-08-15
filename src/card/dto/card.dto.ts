export class CreateCardDto{
  readonly user_id: string
  readonly doctor_id: string
  readonly slot: string
  readonly reminder: number[]
}