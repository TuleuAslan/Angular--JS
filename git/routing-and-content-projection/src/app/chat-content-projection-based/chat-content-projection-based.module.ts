import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatContentPorjectionBasedRoutingModule } from './chat-content-projeciton-based-routing.module';
import { ChatWrapperComponent } from './components/chat-wrapper/chat-wrapper.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
    declarations: [ChatPageComponent, ChatWrapperComponent],
    imports: [CommonModule, ChatContentPorjectionBasedRoutingModule, UiModule],
})
export class ChatContentProjectionBasedModule {}
