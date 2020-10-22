import { Component, HostBinding, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { FlexAlignment, FlexDirection, FlexJustification } from './types';

@Component({
    template: '<ng-content></ng-content>',
    selector: 'ui-flex',
})
export class FlexComponent extends BaseComponent {
    @Input()
    @HostBinding('class.flex')
    isFlex = true;

    @Input()
    @HostBinding('attr.container')
    isContainer = false;

    @Input()
    @HostBinding('style.gap.px')
    gap: number | undefined = undefined;

    @Input()
    @HostBinding('attr.direction')
    direction: FlexDirection = 'column';

    @Input()
    @HostBinding('attr.alignment')
    alignment: FlexAlignment = 'stretch';

    @Input()
    @HostBinding('attr.justification')
    justification: FlexJustification = 'start';

    @Input()
    @HostBinding('attr.wrap')
    wrap = false;

    @HostBinding('attr.grow')
    get canGrow(): boolean {
        return this.grow !== false;
    }

    @HostBinding('style.flexGrow')
    get growValue(): number | undefined {
        if (this.grow && this.grow !== true) {
            return this.grow;
        }
    }
    @Input()
    grow: boolean | number = false;

    @HostBinding('attr.shrink')
    get canShrink(): boolean {
        return this.shrink !== false;
    }
    @HostBinding('style.flexShrink')
    get shrinkValue(): number | undefined {
        if (this.shrink && this.shrink !== true) {
            return this.shrink;
        }
    }
    @Input()
    shrink: boolean | number = false;

    @HostBinding('style.flexBasis.px')
    get flexBasisValue(): number | undefined {
        if (this.basis) {
            return this.basis;
        }
    }

    @Input()
    basis = 0;
}
