import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface TokenResult {
    access_token: string;
}

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private _client: HttpClient) {}

    token: string = 'Basic QnJldDpRd2VydHkxMjMj';

    async signIn(model) {
        const tokenResult = await this._client
            .post<TokenResult>(`http://localhost:3000/sign-in`, model)
            .toPromise();

        return tokenResult;
    }

    async users() {
        const users = await this._client
            .get<{ username: string; password: string }[]>(
                `http://localhost:3000/users`
            )
            .toPromise();

        return users;
    }

    async posts() {
        const posts = await this._client
            .get<any[]>(`http://localhost:3000/posts`, {
                headers: {
                    Authorization: this.token,
                },
            })
            .toPromise();

        return posts;
    }
}


