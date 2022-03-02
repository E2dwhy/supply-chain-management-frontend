import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import icGroup from "@iconify/icons-ic/twotone-group";
import icPageView from "@iconify/icons-ic/twotone-pageview";
import icCloudOff from "@iconify/icons-ic/twotone-cloud-off";
import icTimer from "@iconify/icons-ic/twotone-timer";
import icBook from "@iconify/icons-ic/twotone-book";
import icReceipt from "@iconify/icons-ic/twotone-receipt"
import { defaultChartOptions } from "../../../../@vex/utils/default-chart-options";
import {
  Order,
  tableSalesData,
} from "../../../../static-data/table-sales-data";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import { AuthserviceService } from "src/app/services/authservice.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "vex-dashboard-analytics",
  templateUrl: "./dashboard-analytics.component.html",
  styleUrls: ["./dashboard-analytics.component.scss"],
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy {
  tableColumns: TableColumn<Order>[] = [
    {
      label: "",
      property: "status",
      type: "badge",
    },
    {
      label: "PRODUCT",
      property: "name",
      type: "text",
    },
    {
      label: "$ PRICE",
      property: "price",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: "DATE",
      property: "timestamp",
      type: "text",
      cssClasses: ["text-secondary"],
    },
  ];
  tableData = tableSalesData;

  series: ApexAxisChartSeries = [
    {
      name: "Subscribers",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 67, 33, 89, 44],
    },
  ];

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: "Users",
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60],
    },
    {
      name: "Sessions",
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50],
    },
  ];

  salesSeries: ApexAxisChartSeries = [
    {
      name: "Sales",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87],
    },
  ];

  pageViewsSeries: ApexAxisChartSeries = [
    {
      name: "Page Views",
      data: [405, 800, 200, 600, 105, 788, 600, 204],
    },
  ];

  uniqueUsersSeries: ApexAxisChartSeries = [
    {
      name: "Unique Users",
      data: [356, 806, 600, 754, 432, 854, 555, 1004],
    },
  ];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: "area",
      height: 100,
    },
    colors: ["#ff9800"],
  });

  icGroup = icGroup;
  icPageView = icPageView;
  icCloudOff = icCloudOff;
  icTimer = icTimer;
  icMoreVert = icMoreVert;
  icBook = icBook;
  icReceipt = icReceipt;
  userSessionData: any;
  summaryData: any;
  unsubscribe$ = new Subject();
  salesData: any;
  dateArray: string[];
  options: import("e:/Freelance/frontend-supply-chain-management/src/@vex/components/chart/chart.component").ApexOptions;

  constructor(
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService
  ) {
    const userData = localStorage.getItem("current_user");
    if (userData?.length) {
      this.userSessionData = JSON.parse(userData);
    }
  }

  ngOnInit() {
    this.getUserSummaryData();
    this.getSalesData();
    setTimeout(() => {
      const temp = [
        {
          name: "Subscribers",
          data: [55, 213, 55, 0, 213, 55, 33, 55],
        },
        {
          name: "",
        },
      ];
    }, 3000);
  }

  getUserSummaryData() {
    this.authService
      .getSummaryData(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.summaryData = response["data"];
        }
      });
  }

  getSalesData() {
    this.authService
      .getSalesData(this.userSessionData?.user_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.salesData = response["data"];
          const seriesData = [];
          this.dateArray = Object.keys(this.salesData.sales);
          Object.keys(this.salesData.sales).forEach(
            (date) => {
              const dailyTransactions = this.salesData.sales[date].map(
                (transaction: any) => transaction.total_amount
              );
              let dailyRevenue = dailyTransactions.reduce(
                (acc, cur) => acc + Number(cur),
                0
              );
              dailyRevenue = parseFloat(dailyRevenue).toFixed(2);
              seriesData.push(dailyRevenue);
            }
          );
          this.salesSeries = [
            {
              name: "Revenues (₦)",
              data: seriesData,
            },
          ];

          this.options = defaultChartOptions({
            grid: {
              show: true,
              strokeDashArray: 3,
              padding: {
                left: 16,
              },
            },
            chart: {
              type: "bar",
              height: 300,
              sparkline: {
                enabled: false,
              },
              zoom: {
                enabled: false,
              },
            },
            stroke: {
              width: 4,
            },
            labels: this.dateArray,
            xaxis: {
              type: "datetime",
              labels: {
                show: true,
              },
            },
            yaxis: {
              labels: {
                show: true,
              },
            },
          });
          return this.salesData;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
