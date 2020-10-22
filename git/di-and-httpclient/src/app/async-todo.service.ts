import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { ITodo } from './todos';

@Injectable()
export class AsyncTodoService extends TodoService {
    constructor(private http: HttpClient) {
        super();
    }

    async getTodos() {
        return await this.http
            .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
            .toPromise();
    }

    subscribeForTodos() {
        return this.http.get<ITodo[]>(
            'https://jsonplaceholder.typicode.com/todos'
        );
    }
}
