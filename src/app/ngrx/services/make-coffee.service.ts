import { Injectable } from '@angular/core';
import {delay} from "rxjs";

export enum HaveCondensedMilk {
  cmilk,
  nocmilk,
}

export interface Species {
  coffee: number,
  milk: HaveCondensedMilk,
  sugar: number,
  water: string,
}

export interface Cup {
  species: Species[],
  size: string,
}

@Injectable({
  providedIn: 'root'
})
export class MakeCoffeeService {

  constructor() { }

  public delay(ms: number) {
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve(1);
      }, ms);
    });
  }

  public async prepareCoffee(cup: Cup, species: Species[]) {
    cup.species = [];
    for (let spec of species) {
      cup.species.push(spec);
      await this.delay(500);
    }
    for (let spec of cup.species) {
      if (spec.coffee < 1) {
        console.log('Out of coffee');
        return;
      }
      if (spec.sugar < 1) {
        console.log('Out of sugar');
        return;
      }
      if (spec.water == 'empty') {
        console.log('Out of water');
        return;
      }
    }
    console.log('Coffee prepared!');
    return true;
  }

  public async makeCoffee(cup: Cup) {
    await this.delay(500);
    if (cup.species.length == 0) {
      console.log('Please add some species');
      return false;
    }
    if (cup.size == '') {
      console.log('Please choose a size');
      return false;
    }
      console.log('Coffee is ready!');
      return true;
    }

  public async cupA() {
    console.time('Cup A');
    let cup: Cup = {
      species: [],
      size: 'small',
    };
    console.log('Init cup');
    await Promise.all([
      this.prepareCoffee(cup, [{
        coffee: 1,
        milk: HaveCondensedMilk.cmilk,
        sugar: 1,
        water: 'full',
      }])
    ])
    await this.makeCoffee(cup);
    console.timeEnd('Cup A');
  }
}

