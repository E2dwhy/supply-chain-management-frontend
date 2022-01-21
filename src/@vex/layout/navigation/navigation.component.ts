<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'vex-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  items = this.navigationService.items;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'vex-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  items = this.navigationService.items;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }
}
>>>>>>> 98d0c17... feat: push base  code to repository
