import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

constructor(private http: HttpClient) { }


addOrders(orderData): Observable<any> {
  const url = `http://127.0.0.1:8000/api/createorder`;
  let params = new HttpParams();

  return this.http.post(url, orderData, { responseType: "json", params: params }).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

updateOrders(user_id, orderData): Observable<any> {
  const url = `http://127.0.0.1:8000/api/updateorder/${user_id}`;
  let params = new HttpParams();

  return this.http.put(url, orderData, { responseType: "json", params: params }).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

updateOrder(orderData): Observable<any> {
  const url = `http://127.0.0.1:8000/api/updateorder`;
  let params = new HttpParams();

  return this.http.put(url, orderData, { responseType: "json", params: params }).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

updateOrderStatus(orderData): Observable<any> {
  const url = `http://127.0.0.1:8000/api/updateorderstatus`;
  let params = new HttpParams();

  return this.http.put(url, orderData, { responseType: "json", params: params }).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

  deleteOrder(user_id, order_id): Observable<any> {
  const url = `http://127.0.0.1:8000/api/deleteorder/${user_id}/${order_id}`;
  let params = new HttpParams();
  params = params.append("user_id", user_id);

  return this.http.delete(url, { responseType: "json", params: params }).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

searchOrders(user_id, filterData): Observable<any> {
  const url = `http://127.0.0.1:8000/api/searchorder/${user_id}`;
  let params = new HttpParams();
  params = params.append("productID", filterData.productID);
  params = params.append("customer", filterData.customer);
  params = params.append("salesRepID", filterData.salesRepID);
  params = params.append("dateFrom", filterData.dateFrom);
  params = params.append("dateTo", filterData.dateTo);



  return this.http.get(url, { responseType: "json", params: params }).pipe(
    map((response) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      console.log("Error", error.message);
      return observableThrowError(error);
    })
  );
}

getOrdersList(user_id): Observable<any> {
  const url = `http://127.0.0.1:8000/api/getorderslist/${user_id}`;
  let params = new HttpParams();
  params = params.append("user_id", user_id);

  return this.http
    .get(url, { responseType: "json", params: params })
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
}
getOrderDetailsById(uid, order_id): Observable<any> {
  const url = `http://127.0.0.1:8000/api/getorderbyid/${order_id}/${uid}`;

  return this.http
    .get(url, { responseType: "json" })
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
}

}
