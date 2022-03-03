import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ReplaySubject, Observable, Subject, of } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { UserSession } from "src/app/Models/interfaces";
import { AuthserviceService } from "src/app/services/authservice.service";
import { aioTableLabels, aioTableData } from "src/static-data/aio-table-data";
import { CustomerCreateUpdateComponent } from "../../apps/aio-table/customer-create-update/customer-create-update.component";
import { Customer } from "../../apps/aio-table/interfaces/customer.model";
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
import { ProductModalComponent } from "./product-modal/product-modal.component";
import { ProductsService } from "src/app/services/products.service";
import { DatePipe } from "@angular/common";
@Component({
  selector: "vex-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
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
export class ProductsComponent implements OnInit {
  layoutCtrl = new FormControl("boxed");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  products: UserSession[];
  unsubscribe$ = new Subject();
  @Input()
  columns: TableColumn<Customer>[] = [
    // { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: "Product ID", property: "id", type: "text", visible: true },
    {
      label: "date",
      property: "created_at",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Item Name",
      property: "name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    { label: "Quantity", property: "qty", type: "text", visible: true },
    {
      label: "Unit Price",
      property: "price",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Manif Date",
      property: "manif_date",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },

    {
      label: "Batch No",
      property: "batch_no",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },

    // { label: 'Zipcode', property: 'zipcode', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    // { label: 'City', property: 'city', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    // {
    //   label: "Status",
    //   property: "status",
    //   type: "text",
    //   visible: true,
    //   cssClasses: ["text-secondary", "font-medium"],
    // },
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
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userSessionData: any;
  hasError: boolean;
  errorMessage: string;
  isLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private authService: AuthserviceService,
    private datePipe: DatePipe
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
    this.getProductsList();

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

  getProductsList() {
    this.isLoading = true;
    this.productsService
      .getProductsList(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
          this.products = response["data"].map((data) => {
            data.created_at = this.datePipe.transform(data.created_at, "short");
            data.manif_date = this.datePipe.transform(data.manif_date, "short");
            return data;
          });
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.products;
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

  addProduct() {
    this.dialog
      .open(ProductModalComponent)
      .afterClosed()
      .subscribe((order: any) => {
        /**
         * Customer is the updated customer (if the order pressed Save - otherwise it's null)
         */
        if (order) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.getProductsList();
        }
      });
  }

  updateProduct(product: any) {
    this.dialog
      .open(ProductModalComponent, {
        data: product,
      })
      .afterClosed()
      .subscribe((updatedProduct) => {
        /**
         * Customer is the updated customer (if the order pressed Save - otherwise it's null)
         */
        if (updatedProduct) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */

          this.getProductsList();
          // const index = this.orders.findIndex((existingOrder) => existingOrder.id === updatedOrder.id);
          // this.orders[index] = updatedOrder;
          // this.subject$.next(this.orders);
        }
      });
  }

  deleteProduct(order: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    // this.orders.splice(this.orders.findIndex((existingCustomer) => existingCustomer.id === order.id), 1);
    // this.selection.deselect(order);
    // this.subject$.next(this.orders);

    this.productsService
      .deleteProduct(this.userSessionData?.user_id, order.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response["data"] === true) {
          this.getProductsList();
        }
      });
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach((c) => this.deleteProduct(c));
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
