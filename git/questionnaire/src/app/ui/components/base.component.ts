import { Component, HostBinding } from '@angular/core';

@Component({
    template: ``,
})
export abstract class BaseComponent {
    @HostBinding('class.component')
    get isComponent(): boolean {
        return this._isComponent;
    }

    @HostBinding('class.page')
    get isPage(): boolean {
        return !this._isComponent;
    }

    protected _isComponent = true;
}
