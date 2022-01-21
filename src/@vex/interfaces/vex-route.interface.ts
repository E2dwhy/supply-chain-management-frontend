<<<<<<< HEAD
import { Route } from '@angular/router';

export interface VexRouteData {
  scrollDisabled?: boolean;
  toolbarShadowEnabled?: boolean;
  containerEnabled?: boolean;

  [key: string]: any;
}

export interface VexRoute extends Route {
  data?: VexRouteData;
  children?: VexRoute[];
}

export type VexRoutes = VexRoute[];
=======
import { Route } from '@angular/router';

export interface VexRouteData {
  scrollDisabled?: boolean;
  toolbarShadowEnabled?: boolean;
  containerEnabled?: boolean;

  [key: string]: any;
}

export interface VexRoute extends Route {
  data?: VexRouteData;
  children?: VexRoute[];
}

export type VexRoutes = VexRoute[];
>>>>>>> 98d0c17... feat: push base  code to repository
