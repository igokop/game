import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  addMatch(winner: string, date: string) {
    const newRow: { winner: string; date: string } = {
      winner: winner,
      date: date,
    };
    const matches = this.getMatchesPlayed();
    matches.push(newRow);

    localStorage.setItem(`GAME-APP-MATCHES`, JSON.stringify(matches));
  }

  getMatchesPlayed() {
    const item = localStorage.getItem(`GAME-APP-MATCHES`);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(error);
        return [];
      }
    } else {
      return [];
    }
  }

  removeMatches() {
    localStorage.removeItem(`GAME-APP-MATCHES`);
  }
}
