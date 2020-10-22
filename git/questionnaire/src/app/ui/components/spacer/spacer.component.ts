import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
} from '@angular/core';
import { FlexComponent } from '../flex.component';

@Component({
    selector: 'ui-spacer',
    templateUrl: './spacer.component.html',
    styleUrls: ['./spacer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacerComponent extends FlexComponent implements OnInit {
    @Input()
    @HostBinding('class.left')
    left: any;
    @Input()
    @HostBinding('class.right')
    right: any;
    @Input()
    @HostBinding('class.top')
    top: any;
    @Input()
    @HostBinding('class.bottom')
    bottom: any;

    constructor() {
        super();
    }

    ngOnInit(): void {}
}
