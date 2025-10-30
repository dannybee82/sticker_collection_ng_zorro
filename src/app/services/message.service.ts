import { inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  private messageService = inject(NzMessageService);

  success(message: string): void {
    this.messageService.create('success', message);
  }

  error(message: string): void {
    this.messageService.create('error', message);
  }

  warning(message: string): void {
    this.messageService.create('warning', message);
  }

}