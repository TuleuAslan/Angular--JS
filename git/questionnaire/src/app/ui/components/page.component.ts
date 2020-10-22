import { FlexComponent } from './flex.component';

export abstract class PageComponent extends FlexComponent {
    constructor() {
        super();
        this._isComponent = false;
        this.grow = true;
        this.shrink = true;
    }
}
