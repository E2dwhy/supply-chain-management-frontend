import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}


  addProducts(productData): Observable<any> {
    const url = `http://127.0.0.1:8000/api/addproduct`;
    let params = new HttpParams();

    return this.http.post(url, productData, { responseType: "json", params: params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

    deleteProduct(user_id, product_id): Observable<any> {
    const url = `http://127.0.0.1:8000/api/deleteproduct/${user_id}/${product_id}`;
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

  updateProduct(user_id, productData): Observable<any> {
    const url = `http://127.0.0.1:8000/api/updateproduct/${user_id}`;

    return this.http.put(url, productData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getProductsList(user_id): Observable<any> {
    const url = `http://127.0.0.1:8000/api/getproductslist/${user_id}`;
    let params = new HttpParams();
    params = params.append("user_id", user_id);

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

  getProductDetailsById(uid, product_id): Observable<any> {
    const url = `http://127.0.0.1:8000/api/getproductbyid/${product_id}`;
    let params = new HttpParams();
    params = params.append("uid", uid);

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
}
