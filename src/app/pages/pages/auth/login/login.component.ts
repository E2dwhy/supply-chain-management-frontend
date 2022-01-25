import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { AuthserviceService } from "src/app/services/authservice.service";
import { take } from "rxjs/operators";

@Component({
  selector: "vex-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  inputType = "password";
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  userData: any;
  hasError: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthserviceService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  login() {
    this.authService.login(this.form.value['email'], this.form.value['password']).pipe(take(1)).subscribe(response => {
      if(response['status'] === true) {
        this.userData = response['user'];
        localStorage.setItem('current_user', JSON.stringify(this.userData));
        this.router.navigate(['/dashboards/analytics']);
      } else {
        this.hasError = true;
        this.errorMessage = 'Invalid email/password combination';
      }
    })
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
