import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    OnInit,
    QueryList,
    ViewChild,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { ContactListComponent } from 'src/app/ui/components/contact-list/contact-list.component';

@Component({
    selector: 'app-chat-wrapper',
    templateUrl: './chat-wrapper.component.html',
    styleUrls: ['./chat-wrapper.component.scss'],
})
export class ChatWrapperComponent
    implements OnInit, AfterViewInit, AfterContentInit {
    @ViewChild('contact', { static: true })
    contactRef: ElementRef;

    listLabels: string[] = [];

    @ViewChild('contact', { static: true, read: RouterLinkActive })
    routerLinkActiveRef: RouterLinkActive;

    @ContentChild(ContactListComponent, { static: true })
    contactList: ContactListComponent;

    @ContentChild('list2', { static: true })
    contactList2: ContactListComponent;

    @ContentChildren(ContactListComponent)
    contactLists: QueryList<ContactListComponent>;

    constructor() {}

    ngOnInit(): void {
        this.contactList.navigateToChat(this.contactList.contacts[0]);
    }

    ngAfterViewInit() {
        const div = this.contactRef.nativeElement as HTMLHRElement;
        div.innerHTML = 'I have beed changed';
    }

    ngAfterContentInit() {
        this.contactLists.changes.subscribe(() => {
            this.updateListLabels();
        });

        this.updateListLabels();
    }

    updateListLabels() {
        this.listLabels = this.contactLists.toArray().map((c) => c.label);
    }
}
