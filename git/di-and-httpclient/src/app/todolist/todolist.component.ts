import {
    Component,
    Host,
    Inject,
    Input,
    OnInit,
    Optional,
    SkipSelf,
} from '@angular/core';
import { AsyncTodoService } from '../async-todo.service';
import { CONFIG, IConfig } from '../config';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
    @Input() todos = [];

    constructor(
        @Optional() public todoService: TodoService,
        @Optional() @Inject(CONFIG) public config: IConfig
    ) {
        console.log('found: ', todoService);
    }

    ngOnInit(): void {}
}
