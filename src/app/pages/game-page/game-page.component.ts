import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import {
  IGenericEnvelope,
  PeopleResponseModel,
  ShipResponseModel,
} from 'src/app/interfaces/general.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SwapiService } from 'src/app/services/swapi.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent {
  isLoading = false;
  user1: PeopleResponseModel | null = null;
  ship1: ShipResponseModel | null = null;
  user2: PeopleResponseModel | null = null;
  ship2: ShipResponseModel | null = null;
  winner: 'user1' | 'user2' | null = null;

  constructor(
    private router: Router,
    private swapiService: SwapiService,
    private localStorageService: LocalStorageService
  ) {}

  async getUsersData(): Promise<void> {
    if (!this.isLoading) {
      this.isLoading = true;

      await new Promise<void>((resolve) => {
        this.getUser()
          .pipe(take(1))
          .subscribe((response) => {
            if (response?.result?.properties && response.message === 'ok') {
              this.user1 = response.result.properties;
            }
            resolve();
          });
      });

      await new Promise<void>((resolve) => {
        this.getUser()
          .pipe(take(1))
          .subscribe((response) => {
            if (response?.result?.properties && response.message === 'ok') {
              this.user2 = response.result.properties;
            }
            resolve();
          });
      });
      this.isLoading = false;
    }
  }

  getUser(): Observable<IGenericEnvelope<PeopleResponseModel>> {
    const number = Math.floor(Math.random() * 61);
    return this.swapiService.getUserInfo(number);
  }

  async getShipsData(): Promise<void> {
    if (!this.isLoading) {
      this.isLoading = true;

      await new Promise<void>((resolve) => {
        this.getShip()
          .pipe(take(1))
          .subscribe((response) => {
            if (response?.result?.properties && response.message === 'ok') {
              this.ship1 = response.result.properties;
            }
            resolve();
          });
      });

      await new Promise<void>((resolve) => {
        this.getShip()
          .pipe(take(1))
          .subscribe((response) => {
            if (response?.result?.properties && response.message === 'ok') {
              this.ship2 = response.result.properties;
            }
            resolve();
          });
      });
      this.isLoading = false;
    }
  }

  getShip(): Observable<IGenericEnvelope<ShipResponseModel>> {
    const number = Math.floor(Math.random() * 61);
    return this.swapiService.getShipInfo(number);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  compare(): void {
    if (this.user1 && this.user2 && this.ship1 && this.ship2) {
      const user1Weight = Number(
        this.user1.mass === 'unknown'
          ? 0
          : this.user1.mass.includes(',')
          ? this.user1.mass.replace(',', '')
          : this.user1.mass
      );
      const user1Height = Number(
        this.user1.height === 'unknown'
          ? 0
          : this.user1.height.includes(',')
          ? this.user1.height.replace(',', '')
          : this.user1.height
      );
      const ship1Crew = Number(
        this.ship1.crew.includes('-')
          ? this.ship1.crew.split('-')[1]
          : this.ship1.crew.includes(',')
          ? this.ship1.crew.replace(',', '')
          : this.ship1.crew
      );

      const user2Weight = Number(
        this.user2.mass === 'unknown'
          ? 0
          : this.user2.mass.includes(',')
          ? this.user2.mass.replace(',', '')
          : this.user2.mass
      );
      const user2Height = Number(
        this.user2.height === 'unknown'
          ? 0
          : this.user2.height.includes(',')
          ? this.user2.height.replace(',', '')
          : this.user2.height
      );
      const ship2Crew = Number(
        this.ship2.crew.includes('-')
          ? this.ship2.crew.split('-')[1]
          : this.ship2.crew.includes(',')
          ? this.ship2.crew.replace(',', '')
          : this.ship2.crew
      );

      if (
        user1Weight * user1Height + ship1Crew >
        user2Weight * user2Height + ship2Crew
      ) {
        this.winner = 'user1';
      } else {
        this.winner = 'user2';
      }

      this.localStorageService.addMatch(this.winner, new Date().toISOString());
    }
  }

  reset(): void {
    this.user1 = null;
    this.ship1 = null;
    this.user2 = null;
    this.ship2 = null;
    this.winner = null;
  }
}
