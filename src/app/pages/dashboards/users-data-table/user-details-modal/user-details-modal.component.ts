import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Customer } from "src/app/pages/apps/aio-table/interfaces/customer.model";
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
import { Router, UrlSerializer } from "@angular/router";
import { AuthserviceService } from "src/app/services/authservice.service";
import { take } from "rxjs/operators";


@Component({
  selector: "vex-user-details-modal",
  templateUrl: "./user-details-modal.component.html",
  styleUrls: ["./user-details-modal.component.scss"],
})
export class UserDetailsModalComponent implements OnInit {
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
    'admin',
    'accountant',
    'manager',
    'sales rep',
    'supply manager'
  ]
  userSessionData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private dialogRef: MatDialogRef<UserDetailsModalComponent>,
    private fb: FormBuilder,
    private router: Router, 
    private serializer: UrlSerializer,
    private authService: AuthserviceService
  ) {
    const user = localStorage.getItem("current_user");

    if (user && user.length) {
      this.userSessionData = JSON.parse(user);
    }
    
  }

  ngOnInit() {
    if (this.userData) {
      this.mode = "update";
    } else {
      this.userData = {} as Customer;
    }

    this.form = this.fb.group({
      id: [this.userData.id],
      full_name: [this.userData.full_name || "", Validators.required],
      email: [this.userData.email || "", Validators.email],
      phone_no: [this.userData.phone_no || ""],
      role: [this.userData.role || "", Validators.required],
      url: [this.userData.url || ""]
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

    if (!customer.imageSrc) {
      customer.imageSrc = "assets/img/avatars/1.jpg";
    }

    customer.id = this.userData.id;
    const url = `http://localhost:4200/register?r=${this.form.value?.role}&pn=${this.form.value?.phone_no}&fn=${this.form.value?.full_name}&em=${this.form.value?.email}`
    this.form.get('url').setValue(url);


    // this.dialogRef.close(customer);
        // this.dialogRef.close();
  }

  updateCustomer() {
    const user = this.form.value;
      user.id = this.userData.id;
      user.user_id = this.userSessionData.user_id;
      this.authService
        .updateUser(user)
        .pipe(take(1))
        .subscribe((response) => {
          if (response["status"] === true) {
            this.dialogRef.close(user);
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
    if(isUpdateMode) {
      this.form.controls['full_name'].disable();
      this.form.controls['email'].disable();
      this.form.controls['phone_no'].disable();  
    } 
    return isUpdateMode;
  }
}
