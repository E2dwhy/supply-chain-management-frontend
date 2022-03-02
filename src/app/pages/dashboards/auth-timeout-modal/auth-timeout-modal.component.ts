import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import icClose from "@iconify/icons-ic/twotone-close";

@Component({
  selector: 'vex-auth-timeout-modal',
  templateUrl: './auth-timeout-modal.component.html',
  styleUrls: ['./auth-timeout-modal.component.scss']
})
export class AuthTimeoutModalComponent implements OnInit {

  icClose = icClose;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.dialog.closeAll();
    this.router.navigate(["/login"]);
  }

  stay() {
    this.dialog.closeAll();
  }
}
