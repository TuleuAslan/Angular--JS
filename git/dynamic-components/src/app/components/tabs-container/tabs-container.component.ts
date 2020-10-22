import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ITab } from 'src/app/models';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss'],
})
export class TabsContainerComponent
  implements OnInit, AfterContentInit, AfterViewInit {
  
    @Input()
    labelTemplate: TemplateRef<any>;

    @ViewChild('defaultLabelTemplate')
    defaultLabelTemplate: TemplateRef<any>;

  @ContentChildren(TabComponent)
  tabComponentsQuery: QueryList<TabComponent>;

  tabs: ITab[] = [];

  openedTab: ITab;

  @ViewChild('tabContentPlacement', { read: ViewContainerRef })
  tabContentPlacement: ViewContainerRef;

  viewChecked = false;

  constructor() {}

  ngOnInit(): void {
    this.drawTab(this.openedTab);
  }

  ngAfterContentInit() {
    this.tabComponentsQuery.changes.subscribe(this.updateTabs.bind(this));
    this.updateTabs();
  }

  ngAfterViewInit() {
    this.drawTab(this.openedTab);
  }

  updateTabs() {
    this.tabs = this.tabComponentsQuery.toArray().map((c) => {
      const tab: ITab = {
        component: c,
        isOpened: c.isOpened,
        label: c.label,
      };
      if (c.isOpened) {
        this.openedTab = tab;
      }
      return tab;
    });
    this.drawTab(this.openedTab);
  }

  drawTab(tab: ITab) {
    if (!tab || !this.tabContentPlacement) {
      return;
    }

    const element = this.tabContentPlacement.element
      .nativeElement as HTMLDivElement;
    element.innerHTML = '';
    element.appendChild(tab.component.viewRef.nativeElement);
  }

  selectTab(tab: ITab) {
    this.openedTab = tab;
    this.tabs.forEach((t) => {
      t.isOpened = false;
      t.component.isOpened = false;
    });
    this.openedTab.isOpened = true;
    this.openedTab.component.isOpened = true;

    this.drawTab(this.openedTab);
  }
}
