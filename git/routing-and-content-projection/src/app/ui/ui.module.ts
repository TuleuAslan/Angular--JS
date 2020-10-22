import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { SelectContactComponent } from './components/select-contact/select-contact.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

@NgModule({
    declarations: [ContactListComponent, ChatComponent, SelectContactComponent],
    exports: [ContactListComponent, ChatComponent],
    imports: [CommonModule, CustomMaterialModule] ,
})
export class UiModule {}
