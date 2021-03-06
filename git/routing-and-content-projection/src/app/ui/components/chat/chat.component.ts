import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    @Input() contact: string;
    @Input() messages: string[];
    @Input() isLoading = true;

    constructor() {}

    ngOnInit(): void {}
}
