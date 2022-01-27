import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { ForgotPasswordComponent } from '../pages/auth/forgot-password/forgot-password.component';
import { ActivityLogsComponent } from './activity-logs/activity-logs.component';
import { DashboardAnalyticsComponent } from './dashboard-analytics/dashboard-analytics.component';
import { OrderDetailsComponent } from './orders-data-table/order-details/order-details.component';
import { OrdersDataTableComponent } from './orders-data-table/orders-data-table.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersDataTableComponent } from './users-data-table/users-data-table.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "home",
        loadChildren: () => import('./dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            component: OrdersDataTableComponent,
          },
          {
            path: "order-details/:orderID",
            component: OrderDetailsComponent,
          },
        ],
      },
      {
        path: "products",
        component: ProductsComponent,
      },
      {
        path: "users",
        component: UsersDataTableComponent,
      },
      {
        path: "activity-logs",
        component: ActivityLogsComponent,
      },
      {
        path: "reports",
        component: ReportsComponent,
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class DashboardsRoutingModule{

}
