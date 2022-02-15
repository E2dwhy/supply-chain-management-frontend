import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError as observableThrowError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  login(email, password): Observable<any> {
    const url = "https://api.kachelan.com/api/login";
    const body = {
      email: email,
      password,
    };

    return this.http.post(url, body).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  register(userData): Observable<any> {
    const url = "https://api.kachelan.com/api/register";

    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getSummaryData(user_id: string): Observable<any> {
    const url = `https://api.kachelan.com/api/getusersummarydata/${user_id}`;

    return this.http.get(url, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  getSalesData(user_id: string): Observable<any> {
    const url = `https://api.kachelan.com/api/getmonthlysales/${user_id}`;

    return this.http.get(url, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  deleteUSer(user_id: any): Observable<any> {
    const url = `https://api.kachelan.com/api/deleteuser/${user_id}`;

    return this.http.delete(url, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  uploadPhoto(file: File, uid: string) {
    const url = `https://api.noworri.com/api/uploadpp`;
    const formData: FormData = new FormData();
    formData.append("photo", file);
    formData.append("uid", uid);

    return this.http.post(url, formData, { responseType: "json" }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("Error", error.message);
        return observableThrowError(error);
      })
    );
  }

  mapUploadedFiles(user_id, path) {
    const url = `https://api.noworri.com/api/matchuserupload`;
    let params = new HttpParams();
    params = params.append("path", path);
    params = params.append("transaction_id", user_id);

    return this.http
      .post(url, null, { responseType: "json", params: params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("Error", error.message);
          return observableThrowError(error);
        })
      );
  }

  getUserDetails(phoneNumber): Observable<any> {
    const url = "https://api.noworri.com/api/getuserbyphone";
    let params = new HttpParams();
    params = params.append("user_phone", phoneNumber);

    return this.http
      .post(url, null, { responseType: "json", params: params })
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

  getUsersList(user_id): Observable<any> {
    const url = `https://api.kachelan.com/api/getusers/${user_id}`;
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

  getCustomersList(user_id): Observable<any> {
    const url = `https://api.kachelan.com/api/getcustomers/${user_id}`;
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

  getUserDetailsById(uid): Observable<any> {
    const url = "https://api.noworri.com/api/getuserbyid";
    let params = new HttpParams();
    params = params.append("uid", uid);

    return this.http
      .post(url, null, { responseType: "json", params: params })
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

  aupDateUserAuth(userData) {
    const url = "https://api.noworri.com/api/register";
    let params = new HttpParams();
    params = params.append("user_id", userData.user_id);
    params = params.append("email", userData.email);

    return this.http
      .post(url, null, { responseType: "json", params: params })
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

  updateEmail(userData) {
    const url = `https://api.noworri.com/api/updateemail`;
    let params = new HttpParams();
    params = params.append("id", userData.id);
    params = params.append("email", userData.email);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  updateUser(userData) {
    const url = `https://api.kachelan.com/api/updateuserrole`;

    return this.http.put(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  addCustomer(customerData) {
    const url = `https://api.kachelan.com/api/addcustomer`;

    return this.http.post(url, customerData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  updateCustomer(customerData, user_id) {
    const url = `https://api.kachelan.com/api/updatecustomer/${user_id}`;

    return this.http.put(url, customerData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  updatePassword(userData) {
    const url = `https://api.noworri.com/api/forgotpassupdate`;
    let params = new HttpParams();
    params = params.append("uid", userData.uid);
    params = params.append("password", userData.password);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyUserPassword(userData) {
    const url = `https://api.noworri.com/api/verifyuserpassword`;
    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyEmail(userID, otp) {
    const url = `https://api.noworri.com/api/verifyemail`;
    let params = new HttpParams();
    params = params.append("user_id", userID);
    params = params.append("otp", otp);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  sendEmailVerificationCode(userData) {
    const url = `https://api.noworri.com/api/sendotptoemail`;
    let params = new HttpParams();
    params = params.append("user_id", userData.user_id);
    params = params.append("email", userData.email);

    return this.http.post(url, null, { responseType: "json", params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  sendSMSVerificationCode(userData) {
    const url = `https://api.noworri.com/api/sendotptomobile`;

    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }

  verifyUserByOTP(userData) {
    const url = `https://api.noworri.com/api/verifyotp`;

    return this.http.post(url, userData, { responseType: "json" }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("error", error.message);
        return observableThrowError(error);
      })
    );
  }
}
