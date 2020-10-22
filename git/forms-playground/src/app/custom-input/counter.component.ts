import { Component, Input, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CounterComponent,
            multi: true,
        },
    ],
})
export class CounterComponent implements OnInit, ControlValueAccessor {
    private _currentValue = 0;
    public disabled = false;
    onChange: (value: number) => void;
    onTouch: () => void;

    public get currentValue(): number {
        return this._currentValue;
    }

    public set currentValue(v: number) {
        this._currentValue = v;
        if (this.onChange) {
            this.onChange(this.currentValue);
        }
    }

    constructor() {}

    writeValue(obj: number): void {
        this.currentValue = obj;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    ngOnInit(): void {}

    increase() {
        this.currentValue++;
    }

    decrease() {
        this.currentValue--;
    }
}
