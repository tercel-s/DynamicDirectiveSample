import { Component, ViewChild, ViewContainerRef, AfterViewInit, TemplateRef, NgZone } from '@angular/core';
import { Portal, TemplatePortal } from '@angular/cdk/portal';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  readonly id = `c${uuid.v4()}`;

  @ViewChild('grabbableContent', { static: false }) grabbableContent: TemplateRef<any>;
  @ViewChild('notGrabbableContent', { static: false }) notGrabbableContent: TemplateRef<any>;

  selectedPortal: Portal<any>;
  grabbableContentPortal: TemplatePortal<any>;
  notGrabbableContentPortal: TemplatePortal<any>;

  grabbable = true;

  constructor(private viewContainerRef: ViewContainerRef, private ngZone: NgZone) { }

  ngAfterViewInit() {
    new Promise<void>(resolve => {
      this.grabbableContentPortal = new TemplatePortal(this.grabbableContent, this.viewContainerRef);
      this.notGrabbableContentPortal = new TemplatePortal(this.notGrabbableContent, this.viewContainerRef);
      resolve();
    }).then(() => this.selectedPortal = this.grabbableContentPortal);
  }

  setGrabbable(enabled: boolean) {
    this.grabbable = enabled;
    this.selectedPortal = enabled ? this.grabbableContentPortal : this.notGrabbableContentPortal;
  }
}
