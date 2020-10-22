import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _isAuthenticated: boolean;
    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    signIn() {
        this._isAuthenticated = true;
    }

    singOut() {
        this._isAuthenticated = false;
    }
}
