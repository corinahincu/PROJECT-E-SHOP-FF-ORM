import { Entity } from "typeorm/index.js";

@Entity()
export class Money {
  amount!: number;
  currency!: string;
}
