import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { ProductsService } from './services/products.service';
import { AuthTimeoutModalComponent } from './pages/dashboards/auth-timeout-modal/auth-timeout-modal.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,

    // Vex
    VexModule,
    CustomLayoutModule,
    NgIdleKeepaliveModule.forRoot(),
    MatIconModule,
    IconModule,
    MatDividerModule,
  ],
  providers: [ProductsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
