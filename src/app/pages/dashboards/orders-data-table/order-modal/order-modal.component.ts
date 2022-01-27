import { Component, Inject, Input, OnInit } from "@angular/core";
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
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProductsService } from "src/app/services/products.service";
import { take } from "rxjs/operators";
import { OrdersService } from "src/app/services/orders.service";

@Component({
  selector: "vex-order-modal",
  templateUrl: "./order-modal.component.html",
  styleUrls: ["./order-modal.component.scss"],
})
export class OrderModalComponent implements OnInit {
  static id = 100;


  fieldArray: Array<any> = [];
  newAttribute: any = {};

  form: FormGroup;
  items: FormArray;
  
  mode: "create" | "update" = "create";

  icMoreVert = icMoreVert;
  icClose = icClose;
  icAdd = icAdd;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  products: any;
  userSessionData: any;
  hasError: boolean;
  errorMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orderData: any,
    private dialogRef: MatDialogRef<OrderModalComponent>,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private orderService: OrdersService
  ) {
    const user = localStorage.getItem("current_user");

    if (user && user.length) {
      this.userSessionData = JSON.parse(user);
    }

  }

  ngOnInit() {
    this.getProductsList();
    if (this.orderData) {
      this.mode = "update";
    } else {
      this.orderData = {};
    }

    this.form = this.fb.group({
      id: this.orderData.id || "",
      // imageSrc: this.orderData.imageSrc,
      name: [this.orderData?.name || "", Validators.required],
      items: this.fb.array([ this.createItem() ]),
      delivery_address: [this.orderData?.delivery_address || "", Validators.required],
      total_amount: this.orderData?.qty || "",
      phone_no: [this.orderData.phone_no || "", Validators.required],
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      unit_price: [''],
    });
  }

  save() {
    if (this.mode === "create") {
      this.createOrder();
    } else if (this.mode === "update") {
      this.updateOrder();
    }
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  addItem(): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  deleteFieldValue(index) {
    this.items = this.form.get('items') as FormArray;
    this.items.value[index].delete();
  }

  createOrder() {
    const order = this.form.value;
    order.user_id = this.userSessionData?.user_id;
    // if (!order.imageSrc) {
    //   order.imageSrc = "assets/img/avatars/1.jpg";
    // }

    // this.dialogRef.close(order);
    // order.items = JSON.stringify(order.items)
    this.orderService
    .addOrders(order)
    .pipe(take(1))
    .subscribe((response) => {
      if (response["status"] === true) {
        this.products = response["data"];
        this.dialogRef.close(order);
      } else {

        this.hasError = true;
        this.errorMessage = response['message'];
      }
    });
  }

  updateOrder() {
    const order = this.form.value;
    order.id = this.orderData.id;

    this.orderService
    .addOrders(order)
    .pipe(take(1))
    .subscribe((response) => {
      if (response["status"] === true) {
        this.products = response["data"];
        this.dialogRef.close(order);
      } else {

        this.hasError = true;
        this.errorMessage = response['message'];
      }
    });  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  getPrice(change, index) {
   const selectedProduct = this.products.find(product => product.name === change.value);
   const price = selectedProduct?.price;
   this.items = this.form.get('items') as FormArray;
   this.items.controls[index].get('price').setValue(price);
   this.items.controls[index].get('unit_price').setValue(price);
  }

  updatePrice(event, index) {
    const qty = event.target.value;
    this.items = this.form.get('items') as FormArray;
    const price = this.items.controls[index].get('price').value;
    const newPrice = price * qty;
    this.items.controls[index].get('price').setValue(parseFloat(`${newPrice}`));
    this.getTotalOrder()
  }

  getTotalOrder() {
    this.items = this.form.get('items') as FormArray;
    const prices = this.items.value.map(item => item.price);
    const total = prices.reduce((acc, cur) => acc + cur, 0);
    this.form.get('total_amount').setValue(total);
  }


  getProductsList() {
    this.productsService
      .getProductsList(this.userSessionData?.user_id)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.products = response["data"];
        } else {
          // this.hasError = true;
          // this.errorMessage = response['message'];
        }
      });
  }



}
