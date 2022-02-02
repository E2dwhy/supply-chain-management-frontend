import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router, UrlSerializer } from "@angular/router";
import { take } from "rxjs/operators";
import { Customer } from "src/app/pages/apps/aio-table/interfaces/customer.model";
import { AuthserviceService } from "src/app/services/authservice.service";
import { UserDetailsModalComponent } from "../../users-data-table/user-details-modal/user-details-modal.component";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icPrint from "@iconify/icons-ic/twotone-print";
import icDownload from "@iconify/icons-ic/twotone-cloud-download";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icMyLocation from "@iconify/icons-ic/twotone-my-location";
import icLocationCity from "@iconify/icons-ic/twotone-location-city";
import icEditLocation from "@iconify/icons-ic/twotone-edit-location";
import icEmail from "@iconify/icons-ic/twotone-email";
import icCopy from "@iconify/icons-ic/twotone-content-copy";
import icEdit from "@iconify/icons-ic/twotone-edit";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "vex-customers-modal",
  templateUrl: "./customers-modal.component.html",
  styleUrls: ["./customers-modal.component.scss"],
})
export class CustomersModalComponent implements OnInit {
  static id = 100;
  form: FormGroup;
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  icEmail = icEmail;
  icCopy = icCopy;
  icEdit = icEdit;

  roleOptions = [
    "admin",
    "accountant",
    "manager",
    "sales rep",
    "supply manager",
  ];
  userSessionData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public customerData: any,
    private dialogRef: MatDialogRef<UserDetailsModalComponent>,
    private fb: FormBuilder,
    private router: Router,
    private serializer: UrlSerializer,
    private authService: AuthserviceService,
    private snackBar: MatSnackBar
  ) {
    const user = localStorage.getItem("current_user");

    if (user && user.length) {
      this.userSessionData = JSON.parse(user);
    }
  }

  ngOnInit() {
    if (this.customerData) {
      this.mode = "update";
    } else {
      this.customerData = {} as Customer;
    }

    this.form = this.fb.group({
      id: [this.customerData.id],
      full_name: [this.customerData.full_name || "", Validators.required],
      email: [this.customerData.email || "", [ Validators.required, Validators.email]],
      phone_no: [this.customerData.phone_no || ""],
      address: [this.customerData.address || "", Validators.required],
    });
  }

  save() {
    if (this.mode === "create") {
      this.createCustomer();
    } else if (this.mode === "update") {
      this.updateCustomer();
    }
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  createCustomer() {
    const customer = this.form.value;

    // if (!customer.imageSrc) {
    //   customer.imageSrc = "assets/img/avatars/1.jpg";
    // }
    customer.user_id = this.userSessionData.user_id;

    this.authService
      .addCustomer(customer)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.dialogRef.close(customer);
          this.openSnackbar('Customer created successfully!')
        } else {
          this.dialogRef.close();
        }
      });

    // this.dialogRef.close(customer);
    // this.dialogRef.close();
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }

  updateCustomer() {
    const customer = this.form.value;
    customer.id = this.customerData.id;
    this.authService
      .updateCustomer(customer, this.userSessionData.user_id)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.dialogRef.close(customer);
          this.openSnackbar('Customer updated successfully!');
        } else {
          this.dialogRef.close();
        }
      });
  }

  isCreateMode(): boolean {
    return this.mode === "create";
  }

  isUpdateMode(): boolean {
    const isUpdateMode = this.mode === "update";
    // if (isUpdateMode) {
    //   this.form.controls["full_name"].disable();
    //   this.form.controls["email"].disable();
    //   this.form.controls["phone_no"].disable();
    // }
    return isUpdateMode;
  }
}
