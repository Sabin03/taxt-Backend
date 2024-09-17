import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-base-design',
  templateUrl: './base-design.component.html',
  styleUrl: './base-design.component.css'
})
export class BaseDesignComponent {
  //showFiller = false;
  panelOpenState = false;
}
