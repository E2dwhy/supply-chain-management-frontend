import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
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
import icAdd from "@iconify/icons-ic/twotone-add";
import icDateRange from "@iconify/icons-ic/twotone-date-range";
import icFolder from "@iconify/icons-ic/twotone-folder";
import icShoppingBasket from "@iconify/icons-ic/twotone-shopping-basket";
import { ProductsService } from "src/app/services/products.service";
import { take } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "vex-product-modal",
  templateUrl: "./product-modal.component.html",
  styleUrls: ["./product-modal.component.scss"],
})
export class ProductModalComponent implements OnInit {

  fieldArray: Array<any> = [];
  newAttribute: any = {};

  form: FormGroup;
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;
  icAdd = icAdd;

  products: any[] = [
    { value: "IND", viewValue: "India" },
    { value: "USA", viewValue: "USA" },
    { value: "UK", viewValue: "UK" },
  ];

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  icDateRange = icDateRange;
  icFolder = icFolder;
  icShoppingBasket = icShoppingBasket;
  userSessionData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orderData: any,
    private dialogRef: MatDialogRef<ProductModalComponent>,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {
    const user = localStorage.getItem("current_user");

    if (user && user.length) {
      this.userSessionData = JSON.parse(user);
    }
  }

  ngOnInit() {
    if (this.orderData) {
      this.mode = "update";
    } else {
      this.orderData = {};
    }

    this.form = this.fb.group({
      id: this.orderData.id || "",
      name: this.orderData?.name || "",
      qty: this.orderData?.qty || "",
      price: this.orderData?.price || "",
      batch_no: this.orderData?.batch_no || "",
      manif_date: this.orderData?.manif_date || ""
    });
  }

  save() {
    if (this.mode === "create") {
      this.addProduct();
    } else if (this.mode === "update") {
      this.updateProduct();
    }
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }


  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addProduct() {
    const product = this.form.value;
    product.user_id = this.userSessionData?.user_id;
    // if (!product.imageSrc) {
    //   product.imageSrc = "assets/img/avatars/1.jpg";
    // }

    this.productsService
      .addProducts(product)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.dialogRef.close(product);
        } else {
          this.dialogRef.close();
        }
      });
  }

  updateProduct() {
    const product = this.form.value;
    product.id = this.orderData.id;

    this.productsService
      .updateProduct(this.userSessionData?.user_id, product)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.dialogRef.close(product);
        } else {
          this.dialogRef.close();
        }
      });
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
