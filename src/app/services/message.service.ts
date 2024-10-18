import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message = new BehaviorSubject<string | null>(null);

  showMessage(message: string): void {
    this.message.next(message);

    setTimeout(() => {
      this.message.next(null);
    }, 3000);
  }
}
