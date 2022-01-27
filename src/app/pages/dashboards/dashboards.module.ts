import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardsComponent } from "./dashboards.component";
import { ActivityLogsComponent } from "./activity-logs/activity-logs.component";
import { OrderDetailsComponent } from "./orders-data-table/order-details/order-details.component";
import { OrdersDataTableComponent } from "./orders-data-table/orders-data-table.component";
import { UsersDataTableComponent } from "./users-data-table/users-data-table.component";
import { ReportsComponent } from "./reports/reports.component";
import { ProductsComponent } from "./products/products.component";
import { ProductModalComponent } from "./products/product-modal/product-modal.component";
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IconModule } from "@visurel/iconify-angular";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { AioTableRoutingModule } from "../apps/aio-table/aio-table-routing.module";
import { CustomerCreateUpdateModule } from "../apps/aio-table/customer-create-update/customer-create-update.module";
import { UserDetailsModalComponent } from "./users-data-table/user-details-modal/user-details-modal.component";
import { OrderModalComponent } from "./orders-data-table/order-modal/order-modal.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    AioTableRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    MatButtonToggleModule,
    DashboardsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    DashboardsComponent,
    ActivityLogsComponent,
    OrdersDataTableComponent,
    OrderDetailsComponent,
    ProductsComponent,
    ProductModalComponent,
    UsersDataTableComponent,
    UserDetailsModalComponent,
    ReportsComponent,
    OrderModalComponent
  ],
})
export class DashboardsModule {}