<<<<<<< HEAD
import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import icShoppingBasket from '@iconify/icons-ic/twotone-shopping-basket';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Input() customTemplate: TemplateRef<any>;
  icShoppingBasket = icShoppingBasket;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}
}
=======
import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import icShoppingBasket from '@iconify/icons-ic/twotone-shopping-basket';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Input() customTemplate: TemplateRef<any>;
  icShoppingBasket = icShoppingBasket;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}
}
>>>>>>> 98d0c17... feat: push base  code to repository
