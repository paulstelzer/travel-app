import { Component, OnInit } from '@angular/core';
import { innomobileAnimations } from '../../../shared/animations/innomobile-animations';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
  animations: innomobileAnimations
})
export class PrivacyPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDE() {
    window.open('https://example.com/app-privacy/', '_blank');
  }

  openEN() {
    window.open('https://example.com/app-privacy/', '_blank');
  }

}
