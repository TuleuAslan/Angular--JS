import { Component, OnInit } from '@angular/core';
import { FlexComponent } from './ui/components/flex.component';
import { Question, Questionnaire } from '@models';
import { HttpService } from './shared/services/http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends FlexComponent implements OnInit {
    title = 'questionnaire';

    constructor(private _httpService: HttpService) {
        super();
        this.grow = true;
        this.shrink = true;
    }

    async ngOnInit() {
        // const users = await this._httpService.users();
        // const user = users[4];
        // console.log(await this._httpService.signIn(user));

        console.log(await this._httpService.posts())
    }


}
