import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(private messageService: MessageService) {}

  get messages(): string[] {
    return this.messageService.messages;
  }

  addMessage(message: string): void {
    this.messageService.add(message);
  }

  clearMessages(): void {
    this.messageService.clear();
  }
}
