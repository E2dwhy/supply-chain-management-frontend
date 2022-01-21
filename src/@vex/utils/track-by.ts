<<<<<<< HEAD
import { KeyValue } from '@angular/common';

export function trackByRoute<T extends { route: string | string[] }>(index: number, item: T) {
  return item.route;
}

export function trackById<T extends { id: string | number }>(index: number, item: T) {
  return item.id;
}

export function trackByKey(index: number, item: KeyValue<any, any>) {
  return item.key;
}

export function trackByValue(index: number, value: string) {
  return value;
}

export function trackByLabel<T extends { label: string }>(index: number, value: T) {
  return value.label;
}
=======
import { KeyValue } from '@angular/common';

export function trackByRoute<T extends { route: string | string[] }>(index: number, item: T) {
  return item.route;
}

export function trackById<T extends { id: string | number }>(index: number, item: T) {
  return item.id;
}

export function trackByKey(index: number, item: KeyValue<any, any>) {
  return item.key;
}

export function trackByValue(index: number, value: string) {
  return value;
}

export function trackByLabel<T extends { label: string }>(index: number, value: T) {
  return value.label;
}
>>>>>>> 98d0c17... feat: push base  code to repository
