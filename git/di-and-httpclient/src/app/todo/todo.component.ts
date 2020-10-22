import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
    @Input() todo;

    constructor(public todoService: TodoService) {}

    ngOnInit(): void {}
}
