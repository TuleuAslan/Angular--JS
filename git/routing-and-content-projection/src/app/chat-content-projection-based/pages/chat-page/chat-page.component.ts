import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
    contact: string;

    hidden = true;

    get loading() {
        return this.chatService.loading;
    }
    messages = [];

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {}

    async contactSelectedHandler(contact) {
        this.messages = await this.chatService.getMessages(contact);
        this.contact = contact;
    }
}
