import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo.service';
import { AsyncTodoService } from './async-todo.service';
import { CONFIG, CONFIG_PROVIDER } from './config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './indeterceptors/interceptor';

@NgModule({
    declarations: [AppComponent, TodolistComponent, TodoComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [
        AsyncTodoService,
        {
            provide: TodoService,
            useExisting: AsyncTodoService,
        },
        CONFIG_PROVIDER,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true,
        },

        // {
        //     provide: APP_INITIALIZER,
        //     useValue: () => {
        //         return new Promise((resolve) => {
        //             setTimeout(() => {
        //                 resolve();
        //                 console.log('application initialized');
        //             }, 3000);
        //         });
        //     },
        //     multi: true,
        // },
        // { provide: TodoService, useExisting: AsyncTodoService },
        // {
        //     provide: TodoService,
        //     useValue: {
        //         getTodos() {
        //             return [
        //                 {
        //                     userId: 1,
        //                     id: 1,
        //                     title: 'delectus aut autem',
        //                     completed: false,
        //                 },
        //             ];
        //         },
        //     },
        // },
        // {
        //     provide: TodoService,
        //     useFactory: (asyncTodos) => {
        //         console.log('factory', asyncTodos);
        //         return new TodoService();
        //     },
        //     deps: [AsyncTodoService],
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
