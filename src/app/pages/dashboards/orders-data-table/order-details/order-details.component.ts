import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import icMail from "@iconify/icons-ic/twotone-mail";
import icPhone from "@iconify/icons-ic/twotone-phone";
import { take } from "rxjs/operators";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { OrdersService } from "src/app/services/orders.service";

@Component({
  selector: "vex-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
  animations: [fadeInUp400ms],
})
export class OrderDetailsComponent implements OnInit {
  icMail = icMail;
  icPhone = icPhone;
  orderData: any;
  hasError: boolean;
  errorMessage: any;
  orderID: any;

  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();
  layoutCtrl = new FormControl("boxed");
  userSessionData: any;
  items: any;

  constructor(private orderService: OrdersService, private route: ActivatedRoute) {
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



  getOrderDetails() {
    this.orderService
      .getOrderDetailsById(this.userSessionData.user_id, this.orderID)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.orderData = response["data"];
          this.items = JSON.parse(this.orderData?.items);
          console.log('[items]', this.items)
        } else {
          this.hasError = true;
          this.errorMessage = response["message"];
        }
      });
  }
}
