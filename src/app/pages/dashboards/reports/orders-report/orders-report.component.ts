import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ReplaySubject, Observable, Subject, of } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import {
  ORDER_STATUS_TABLE_LABELS,
  USER_ROLES,
} from "src/app/Models/constants";
import { UserSession } from "src/app/Models/interfaces";
import { Customer } from "src/app/pages/apps/aio-table/interfaces/customer.model";
import { AuthserviceService } from "src/app/services/authservice.service";
import { OrdersService } from "src/app/services/orders.service";
import { aioTableLabels, aioTableData } from "src/static-data/aio-table-data";
import { OrderModalComponent } from "../../orders-data-table/order-modal/order-modal.component";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductsService } from "src/app/services/products.service";
import icDateRange from "@iconify/icons-ic/twotone-date-range";
import icPerson from "@iconify/icons-ic/twotone-person";
import icRefresh from "@iconify/icons-ic/twotone-refresh";
import icBook from "@iconify/icons-ic/twotone-book";
@Component({
  selector: "vex-orders-report",
  templateUrl: "./orders-report.component.html",
  styleUrls: ["./orders-report.component.scss"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class OrdersReportComponent implements OnInit, OnDestroy {
  layoutCtrl = new FormControl("boxed");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  orders: UserSession[];
  unsubscribe$ = new Subject();
  @Input()
  columns: TableColumn<Customer>[] = [
    // { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: "Order ID", property: "id", type: "text", visible: true },
    {
      label: "date",
      property: "created_at",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Name",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    {
      label: "Total Amount",
      property: "total_amount",
      type: "text",
      visible: false,
    },
    // { label: "Contact", property: "phone_no", type: "button", visible: true },
    {
      label: "Delivery Address",
      property: "delivery_address",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },

    // { label: 'Zipcode', property: 'zipcode', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    // { label: 'City', property: 'city', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    {
      label: "Status",
      property: "status",
      type: "badge",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    // { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: "Actions", property: "actions", type: "button", visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<any> | null;
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icPerson = icPerson;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  icDateRange = icDateRange;
  icBook = icBook
  icRefresh = icRefresh;
  form: FormGroup;

  statusLabels = ORDER_STATUS_TABLE_LABELS;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userSessionData: any;
  hasError: boolean;
  errorMessage: string;
  isLoading: boolean;
  customers: any;
  users: any;
  products: any;

  constructor(
    private ordersService: OrdersService,
    private authService: AuthserviceService,
    private router: Router,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private orderService: OrdersService,
    private snackBar: MatSnackBar
  ) {
    const user = localStorage.getItem("current_user");

    if (user && user.length) {
      this.userSessionData = JSON.parse(user);
    }
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(aioTableData.map((customer) => new Customer(customer)));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    // this.getData().subscribe(customers => {
    //   this.subject$.next(customers);
    // });
    this.getOrdersList();
    this.getCustomersData();
    this.getUsersData();
    this.getProductsList();
    this.form = this.fb.group({
      salesRepID: [""],
      dateFrom: [""],
      dateTo: [""],
      customer: [""],
      productID: [""],
    });
    // this.data$.pipe(
    //   filter<OrderSession[]>(Boolean)
    // ).subscribe(customers => {
    //   this.orders = customers;
    //   this.dataSource.data = customers;
    // });

    this.searchCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.onFilterChange(value));
  }

  resetForm() {
    this.form = this.fb.group({
      salesRepID: [""],
      dateFrom: [""],
      dateTo: [""],
      customer: [""],
      productID: [""]
    });
    this.getOrdersList();
  }

  getProductsList() {
    this.isLoading = true;
    this.productsService
      .getProductsList(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
          this.products = response["data"];
        } else {
          // this.hasError = true;
          // this.errorMessage = response['message'];
        }
      });
  }

  getOrdersList(filteredData = null) {
    this.isLoading = true;
    this.ordersService
      .getOrdersList(this.userSessionData?.user_id)
      .pipe(take(1))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
            this.orders = response["data"].map((data) => {
              data.status = this.getStatusLabel(data.status);
              return data;
            });
            this.dataSource = new MatTableDataSource();
            this.dataSource.data = this.orders;
        } else {
          this.hasError = true;
          this.errorMessage = response["message"];
        }
      });
  }

  get isFormReady(): boolean {
    return !!this.users && !!this.customers;
  }

  getCustomersData() {
    this.isLoading = true;
    this.authService
      .getCustomersList(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
          this.customers = response["data"];
        } else {
          this.hasError = true;
          this.errorMessage = response["message"];
        }
      });
  }

  getUsersData() {
    this.isLoading = true;
    this.authService
      .getUsersList(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
          this.users = response["data"]?.filter(
            (data) => data.role === USER_ROLES.SR
          );
        } else {
          this.hasError = true;
          this.errorMessage = response["message"];
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // createCustomer() {
  //   this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
  //     /**
  //      * Customer is the updated customer (if the order pressed Save - otherwise it's null)
  //      */
  //     if (customer) {
  //       /**
  //        * Here we are updating our local array.
  //        * You would probably make an HTTP request here.
  //        */
  //       this.orders.unshift(new Customer(customer));
  //       this.subject$.next(this.orders);
  //     }
  //   });
  // }

  search() {
    console.log(["[searchForm]", this.form.value]);
    if (this.form.value["dateFrom"] && this.form.value["dateTo"]) {
      const from = new Date(this.form.value["dateFrom"])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const to = new Date(this.form.value["dateTo"])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      // this.form.get("dateFrom").setValue(from);
      // this.form.get("dateTo").setValue(to);
      this.form.value['dateFrom'] = from;
      this.form.value['dateTo'] = to;
    }

    this.isLoading = true;
    this.ordersService
      .searchOrders(this.userSessionData?.user_id, this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
          this.orders = response["data"].map((data) => {
            data.status = this.getStatusLabel(data.status);
            return data;
          });
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.orders;
        } else {
          this.hasError = true;
          this.errorMessage =
            "No data Found for the specified search criteria. Please try with different data";
        }
      });
  }

  viewOrderDetails(order: any) {
    this.router.navigate(["/dashboards/orders/order-details/" + order.id]);
  }

  getStatusLabel(status: string) {
    console.log("status", status);
    return this.statusLabels.find((label) => label.text === status);
  }

  deleteOrder(order: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    // this.orders.splice(this.orders.findIndex((existingCustomer) => existingCustomer.id === order.id), 1);
    // this.selection.deselect(order);
    // this.subject$.next(this.orders);

    this.ordersService
      .deleteOrder(this.userSessionData?.user_id, order.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response["data"] === true) {
          this.getOrdersList();
        }
      });
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach((c) => this.deleteOrder(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    // const index = this.orders.findIndex(c => c === row);
    // this.orders[index].labels = change.value;
    // this.subject$.next(this.orders);
  }
}
