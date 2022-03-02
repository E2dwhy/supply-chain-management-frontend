import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPrint from "@iconify/icons-ic/twotone-print";
import icCheck from "@iconify/icons-ic/twotone-check";
import icDelete from "@iconify/icons-ic/twotone-delete";

import { take } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { OrdersService } from "src/app/services/orders.service";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { USER_ROLES } from "src/app/Models/constants";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "vex-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
  animations: [fadeInUp400ms],
})
export class OrderDetailsComponent implements OnInit {
  icMail = icMail;
  icPhone = icPhone;
  icPrint = icPrint;
  icCheck = icCheck;
  icDelete = icDelete;

  orderData: any;
  hasError: boolean;
  errorMessage: any;
  orderID: any;
  showDiscount: boolean = true;

  
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();
  layoutCtrl = new FormControl("boxed");
  userSessionData: any;
  items: any;
  isExporting: boolean;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const user = localStorage.getItem("current_user");

    if (user && user.length) {
      this.userSessionData = JSON.parse(user);
    }
    route.params.pipe(take(1)).subscribe((param) => {
      this.orderID = param.orderID;
    });
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  exportAsPDF()
    {
      this.isExporting = true
        let data = document.getElementById('invoice');  
        html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
        pdf.save(`${this.orderID}-invoice.pdf`); 
        this.isExporting = false;  
      }); 
    }

  approveOrder(role) {
    const updatedOrder = {...this.orderData};
    updatedOrder.status = role === USER_ROLES.ACC ? 'billed' : 'approved';
    updatedOrder.user_id = this.userSessionData.user_id
    this.orderService
    .updateOrderStatus(updatedOrder)
    .pipe(take(1))
    .subscribe((response) => {
      if (response["status"] === true) {
        this.orderData = response["data"];
        this.openSnackbar('Order approved successfully!')
        this.items = JSON.parse(this.orderData?.items);
        this.router.navigate(['/dashboards/orders']);
      } else {
        this.hasError = true;
        this.errorMessage = response["message"];
      }
    });
  }

  markAsCompleted(role) {
    const updatedOrder = {...this.orderData};
    updatedOrder.status = 'completed';
    updatedOrder.user_id = this.userSessionData.user_id
    this.orderService
    .updateOrderStatus(updatedOrder)
    .pipe(take(1))
    .subscribe((response) => {
      if (response["status"] === true) {
        this.orderData = response["data"];
        this.openSnackbar('Order Completed successfully!')
        this.items = JSON.parse(this.orderData?.items);
        this.router.navigate(['/dashboards/orders']);
      } else {
        this.hasError = true;
        this.errorMessage = response["message"];
      }
    });
  }

  rejectOrder(role) {
    const updatedOrder = {...this.orderData};
    updatedOrder.status = role === USER_ROLES.ACC ? 'bill-rejetected' : 'rejected';
    updatedOrder.user_id = this.userSessionData.user_id
    this.orderService
    .updateOrderStatus(updatedOrder)
    .pipe(take(1))
    .subscribe((response) => {
      if (response["status"] === true) {
        this.orderData = response["data"];
        this.items = JSON.parse(this.orderData?.items);
        this.openSnackbar('Order rejected successfully');
        this.router.navigate(['/dashboards/orders']);
      } else {
        this.hasError = true;
        this.errorMessage = response["message"];
      }
    });
  }

  openSnackbar(message) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }


  getOrderDetails() {
    this.orderService
      .getOrderDetailsById(this.userSessionData.user_id, this.orderID)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.orderData = response["data"];
          this.items = JSON.parse(this.orderData?.items);
        } else {
          this.hasError = true;
          this.errorMessage = response["message"];
        }
      });
  }
}
