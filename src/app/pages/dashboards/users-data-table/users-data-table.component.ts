import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
import { untilDestroyed } from "@ngneat/until-destroy";
import { ReplaySubject, Observable, of, Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
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
import { UserSession } from "src/app/Models/interfaces";
import { AuthserviceService } from "src/app/services/authservice.service";
import { UserDetailsModalComponent } from "./user-details-modal/user-details-modal.component";

@Component({
  selector: "vex-users-data-table",
  templateUrl: "./users-data-table.component.html",
  styleUrls: ["./users-data-table.component.scss"],

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
export class UsersDataTableComponent implements OnInit, OnDestroy {
  layoutCtrl = new FormControl("boxed");

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  users: UserSession[];
  unsubscribe$ = new Subject();
  @Input()
  columns: TableColumn<Customer>[] = [
    // { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: "User ID", property: "user_id", type: "text", visible: true },
    {
      label: "Full Name",
      property: "full_name",
      type: "text",
      visible: true,
      cssClasses: ["font-medium"],
    },
    { label: "email", property: "email", type: "text", visible: false },
    // { label: "Contact", property: "phone_no", type: "button", visible: true },
    {
      label: "role",
      property: "role",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    {
      label: "Creation Date",
      property: "created_at",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    // { label: 'Zipcode', property: 'zipcode', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    // { label: 'City', property: 'city', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    {
      label: "Phone",
      property: "phone_no",
      type: "text",
      visible: true,
      cssClasses: ["text-secondary", "font-medium"],
    },
    // { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: "Actions", property: "actions", type: "button", visible: true },
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<UserSession> | null;
  selection = new SelectionModel<UserSession>(true, []);
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
    private authService: AuthserviceService
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
    this.getUsersData();

    // this.data$.pipe(
    //   filter<UserSession[]>(Boolean)
    // ).subscribe(customers => {
    //   this.users = customers;
    //   this.dataSource.data = customers;
    // });

    this.searchCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.onFilterChange(value));
  }

  getUsersData() {
    this.isLoading = true;
    this.authService
      .getUsersList(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.isLoading = false;
        if (response["status"] === true) {
          this.users = response["data"];
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = response["data"];
          console.log("[datasource.data]", this.dataSource.data);
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
  //      * Customer is the updated customer (if the user pressed Save - otherwise it's null)
  //      */
  //     if (customer) {
  //       /**
  //        * Here we are updating our local array.
  //        * You would probably make an HTTP request here.
  //        */
  //       this.users.unshift(new Customer(customer));
  //       this.subject$.next(this.users);
  //     }
  //   });
  // }

  createUser() {
    this.dialog
      .open(UserDetailsModalComponent)
      .afterClosed()
      .subscribe((user: any) => {
        this.getUsersData();
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (user) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
        }
      });
  }

  updateUser(user: any) {
    this.dialog
      .open(UserDetailsModalComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe((updatedUser) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (updatedUser) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */

          this.getUsersData();
          // const index = this.users.findIndex((existingUser) => existingUser.id === updatedUser.id);
          // this.users[index] = updatedUser;
          // this.subject$.next(this.users);
        }
      });
  }

  deleteUser(user: any) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    // this.users.splice(this.users.findIndex((existingCustomer) => existingCustomer.id === user.id), 1);
    // this.selection.deselect(user);
    // this.subject$.next(this.users);

    this.authService
      .deleteUSer(user.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response["data"] === true) {
          this.getUsersData();
        }
      });
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach((c) => this.deleteUser(c));
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
    // const index = this.users.findIndex(c => c === row);
    // this.users[index].labels = change.value;
    // this.subject$.next(this.users);
  }
}
