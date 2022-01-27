import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { v4 as uuid } from "uuid";
import { AuthserviceService } from "src/app/services/authservice.service";
import { take } from "rxjs/operators";
@Component({
  selector: "vex-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [fadeInUp400ms],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  userData: any;
  role: string;
  userID: string;
  fullName: any;
  email: any;
  phoneNumber: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthserviceService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.role = params["r"];
      this.email = params["em"];
      this.fullName = params["fn"];
      this.phoneNumber = params["pn"];
      // this.userID = params["user_id"];
      console.log("[params]", params);
      this.buildForm();
    });
  }
  buildForm() {
    this.form = this.fb.group(
      {
        name: [this.fullName || "", Validators.required],
        email: [this.email || "", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        phone_no: [this.phoneNumber || "", Validators.required],
        passwordConfirm: ["", Validators.required],
      },
      {
        validator: this.validatePasswords,
      }
    );
  }

  validatePasswords(form: FormGroup): ValidationErrors {
    const password = form.value["password"];
    const confirmPassword = form.value["passwordConfirm"];
    if (confirmPassword === password) {
      return null;
    } else {
      return {
        passwordsDoNotMatch: true,
      };
    }
  }

  register() {
    this.userData = {
      full_name: this.form.value["name"],
      email: this.form.value["email"],
      phone_no: this.form.value["phone_no"],
      password: this.form.value["password"],
      password_confirmation: this.form.value["passwordConfirm"],
      role: this.getRole(),
      user_id: this.getUserID(),
    };
    console.log("[userData]", this.userData);

    this.authService
      .register(this.userData)
      .pipe(take(1))
      .subscribe((response) => {
        if (response["status"] === true) {
          this.router.navigate(["/login"]);
        }
      });
  }

  getRole() {
    if (this.role) {
      return this.role;
    } else {
      return "admin";
    }
  }
  getUserID() {
    const uuidValue = uuid();
    const userID = uuidValue;
    return userID;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
