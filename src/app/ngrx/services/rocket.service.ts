import { Injectable } from '@angular/core';
import {delay} from "rxjs";

export enum Gender {
  male,
  female
}

export interface Astronaut {
  displayName: string,
  gender: Gender,
  height: number,
  weight: number
}

export interface Rocket {
  fuel: number,
  crew: Astronaut[],
}

@Injectable({
  providedIn: 'root'
})
export class RocketService {

  constructor() {}

  public delay(ms: number) {
    return new Promise( (resolve,reject) => {
      setTimeout(() => {
        resolve(1);
      }, ms);
    });
  }

  public async launch(rocket: Rocket) {
    await this.delay(500);
    if (rocket.fuel < 100) {
      console.log('Out of fuel');
      return;
    }
    if (rocket.crew.length == 0) {
      console.log('Please add some amongus crew');
      return false;
    }
    console.log('Rocket launched!');
    return true;
  }

  public async refill(rocket: Rocket) {
    while (rocket.fuel < 100) {
      rocket.fuel ++;
      await this.delay(50);
    }
  }

  public async prepare(rocket: Rocket, crew: Astronaut[]) {
    rocket.crew = [];
    for(let ast of crew) {
      rocket.crew.push(ast);
      await this.delay(1000);
    }
  }

  public async planA() {
    console.time("Plan A");
    let rocket: Rocket = {fuel: 0, crew: []};
    await Promise.all([
      this.prepare(rocket, [{
        displayName: "Miruku",
        gender: Gender.male,
        weight: 60,
        height: 180,
      },
        {
          displayName: "Kanna",
          gender: Gender.female,
          weight: 50,
          height: 160,
        },
        {
          displayName: "Kobayashi",
          gender: Gender.male,
          weight: 70,
          height: 170,
        }]),
      this.refill(rocket)
    ]);
    console.log('Refill rocket');
    await this.launch(rocket);
    console.timeEnd('planA');
  }
}
