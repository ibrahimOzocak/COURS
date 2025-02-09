/* export class Player {
    constructor(
      public id: string,
      public rank: number
    ) {}
  } */

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string;

  @Column('int')
  rank: number;

  constructor(id: string, rank: number) {
    this.id = id;
    this.rank = rank;
  }
}