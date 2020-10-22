import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { TabsContainerComponent } from './components/tabs-container/tabs-container.component';
import { TabComponent } from './components/tab/tab.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { CustomTextInputComponent } from './components/dynamic-form/custom-text-input/custom-text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsContainerComponent,
    TabComponent,
    DynamicFormComponent,
    CustomTextInputComponent,
  ],
  // entryComponents: [CustomTextInputComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
