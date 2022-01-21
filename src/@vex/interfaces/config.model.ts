<<<<<<< HEAD
import { ConfigName } from './config-name.model';

export interface Config {
  id: ConfigName;
  rtl?: boolean;
  name: string;
  imgSrc: string;
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    title: string;
    imageUrl: string;
    showCollapsePin: boolean;
    state: 'expanded' | 'collapsed';
  };
  toolbar: {
    fixed: boolean;
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    visible: boolean;
    fixed: boolean;
  };
}
=======
import { ConfigName } from './config-name.model';

export interface Config {
  id: ConfigName;
  rtl?: boolean;
  name: string;
  imgSrc: string;
  layout: 'vertical' | 'horizontal';
  boxed: boolean;
  sidenav: {
    title: string;
    imageUrl: string;
    showCollapsePin: boolean;
    state: 'expanded' | 'collapsed';
  };
  toolbar: {
    fixed: boolean;
  };
  navbar: {
    position: 'below-toolbar' | 'in-toolbar';
  };
  footer: {
    visible: boolean;
    fixed: boolean;
  };
}
>>>>>>> 98d0c17... feat: push base  code to repository
