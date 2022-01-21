<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'vex-components-overview-radio',
  templateUrl: './components-overview-radio.component.html',
  styleUrls: ['./components-overview-radio.component.scss']
})
export class ComponentsOverviewRadioComponent implements OnInit {

  radioHTML = `<mat-radio-group [(ngModel)]="favoriteSeason">
  <mat-radio-button class="radio" *ngFor="let season of seasons" [value]="season">
    {{ season }}
  </mat-radio-button>
</mat-radio-group>`;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  favoriteSeason = this.seasons[2];

  constructor() {
  }

  ngOnInit() {
  }

}
=======
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'vex-components-overview-radio',
  templateUrl: './components-overview-radio.component.html',
  styleUrls: ['./components-overview-radio.component.scss']
})
export class ComponentsOverviewRadioComponent implements OnInit {

  radioHTML = `<mat-radio-group [(ngModel)]="favoriteSeason">
  <mat-radio-button class="radio" *ngFor="let season of seasons" [value]="season">
    {{ season }}
  </mat-radio-button>
</mat-radio-group>`;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  favoriteSeason = this.seasons[2];

  constructor() {
  }

  ngOnInit() {
  }

}
>>>>>>> 98d0c17... feat: push base  code to repository
