import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CustomTextInputComponent } from './custom-text-input/custom-text-input.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
  @ViewChild('textTemplate')
  textTemplate: TemplateRef<any>;
  @ViewChild('passwordTemplate')
  passwordTemplate: TemplateRef<any>;
  @ViewChild('numberTemplate')
  numberTemplate: TemplateRef<any>;

  templates: Map<string, TemplateRef<any>>;

  inputs = ['text', 'password', 'number', 'password', 'number', 'password'];

  @ViewChild('form', { read: ViewContainerRef })
  formContainerRef: ViewContainerRef;

  constructor(
    private _cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.templates = new Map<string, TemplateRef<any>>()
      .set('text', this.textTemplate)
      .set('password', this.passwordTemplate)
      .set('number', this.numberTemplate);

    this.inputs.forEach((input) => {
      if (input == 'password') {
        const factory = this._cfr.resolveComponentFactory(CustomTextInputComponent);
        this.formContainerRef.createComponent(factory);
      } else {
        const template = this.templates.get(input);
        this.formContainerRef.createEmbeddedView(template);
      }
    });
  }
}
