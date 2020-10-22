import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

class Interceptor implements HttpInterceptor {
    authorized: boolean;
    token: string;

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.authorized) {
            return next.handle(
                req.clone({
                    setHeaders: {
                        Authorization: this.token,
                    },
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
