import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    CanLoad,
    Route,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ChatPageComponent } from '../chat-route-based/pages/chat-page/chat-page.component';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationHandler
    implements
        CanActivate,
        CanActivateChild,
        CanLoad,
        CanDeactivate<ChatPageComponent> {
    constructor(private authenticationService: AuthenticationService) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return this.authenticationService.isAuthenticated;
    }
    canLoad(route: Route, segments: UrlSegment[]) {
        return this.authenticationService.isAuthenticated;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.isAuthenticated;
    }

    canDeactivate(
        component: ChatPageComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ) {
        return confirm('Вы хотите закрыть страницу?');
    }
}
