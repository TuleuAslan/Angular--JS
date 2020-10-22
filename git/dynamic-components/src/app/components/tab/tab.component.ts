import { Component, ElementRef, HostBinding, Input, OnInit, ViewRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input()
  label: string;

  @Input()
  @HostBinding('class.opened')
  isOpened: boolean;

  constructor(public viewRef: ElementRef) { }

  ngOnInit(): void {
  }

}
