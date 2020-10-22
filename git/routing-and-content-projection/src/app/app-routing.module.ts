import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ChatRouteBasedModule } from './chat-route-based/chat-route-based.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthenticationHandler } from './services/authenticationHandler';

const routes: Routes = [
    {
        path: 'route-based',
        loadChildren: async () => {
            const module = await import(
                './chat-route-based/chat-route-based.module'
            );
            return module.ChatRouteBasedModule;
        },
        // canLoad: [AuthenticationHandler],
        // loadChildren: () => ChatRouteBasedModule
    },
    {
        path: 'content-projection-based',
        loadChildren: async () => {
            const module = await import(
                './chat-content-projection-based/chat-content-projection-based.module'
            );
            return module.ChatContentProjectionBasedModule;
        },
    },
    {
        path: '',
        redirectTo: 'route-based',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
