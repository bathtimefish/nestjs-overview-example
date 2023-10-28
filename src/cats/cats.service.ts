import { Injectable } from '@nestjs/common';
import type { Cat } from '../interfaces/cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find((v) => v.id === id);
  }
}
