import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './route-based-chat.component.html',
    styleUrls: ['./route-based-chat.component.scss'],
})
export class RouteBasedChatComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {}

    contactSelectedHandler(contact) {
        // this.router.navigateByUrl(`/route-based/chat/${contact}`);
        this.router.navigate([contact], { relativeTo: this.route });
    }

    logoutHandler() {
        this.router.navigate(['./../../content-projection-based'], { relativeTo: this.route });
    }
}
