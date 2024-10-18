import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnum } from 'src/app/enums/navigation.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  matchesPlayed: number = 0;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.matchesPlayed = this.localStorageService.getMatchesPlayed().length;
  }

  goToGame(): void {
    this.router.navigate([NavigationEnum.Game]);
  }

  resetResults(): void {
    this.localStorageService.removeMatches();
    this.messageService.showMessage('Matches history removed!');
    this.matchesPlayed = this.localStorageService.getMatchesPlayed().length;
  }

  downloadResults(): void {
    const matchesPlayedArray = this.localStorageService.getMatchesPlayed();
    if (matchesPlayedArray.length) {
      window.open(
        URL.createObjectURL(
          new Blob([JSON.stringify(matchesPlayedArray)], {
            type: 'application/binary',
          })
        )
      );
    } else {
      this.messageService.showMessage("You don't have any matches history!");
    }
  }
}
