import { Injectable } from '@angular/core';
import { TODOS } from './todos';

@Injectable()
export class TodoService {
    static ID: number = 1;

    id: number;

    constructor() {
        this.id = TodoService.ID++;
    }

    private _todos = TODOS;

    async getTodos() {
        return this._todos;
    }
}
