import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRouteBasedRoutingModule } from './chat-route-based-routing.module';
import { RouteBasedChatComponent } from './pages/route-based-chat/route-based-chat.component';
import { UiModule } from '../ui/ui.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

@NgModule({
    declarations: [RouteBasedChatComponent, ChatPageComponent],
    imports: [CommonModule, ChatRouteBasedRoutingModule, UiModule],
})
export class ChatRouteBasedModule {}
