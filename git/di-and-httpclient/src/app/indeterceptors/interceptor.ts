import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CONFIG, IConfig } from '../config';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(@Inject(CONFIG) private config: IConfig) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('starting request to', req.url);

        const clonnedReq = req.clone({
            params: new HttpParams().set(
                '_limit',
                this.config.maxItemsAllowed.toString()
            ),
        });

        return next.handle(clonnedReq);
        // return from([
        //     new HttpResponse({
        //         body: [
        //             {
        //                 userId: 1,
        //                 id: 1,
        //                 title: 'delectus aut autem',
        //                 completed: false,
        //             },
        //         ],
        //     }),
        // ]);
    }
}
