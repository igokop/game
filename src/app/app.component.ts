import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'game';
  errorMessage: string | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message.subscribe((value) => {
      this.errorMessage = value;
    });
  }
}
