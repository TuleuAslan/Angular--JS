import { Component, OnInit } from '@angular/core';
import { AsyncTodoService } from './async-todo.service';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'di-and-http';

    todos = [];

    constructor(public todoService: AsyncTodoService) {}

    async ngOnInit() {
        // this.todos = await this.todoService.getTodos();

        this.todoService
            .subscribeForTodos()
            // .pipe(map((todos) => todos.filter((todo) => !todo.completed)))
            .subscribe((todos) => {
                this.todos = todos;
            });
    }
}
