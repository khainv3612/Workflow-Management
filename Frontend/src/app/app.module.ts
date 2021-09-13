import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/auth/login/login.component';
import {RegisterComponent} from './component/auth/register/register.component';
import {ErrorPageComponent} from './component/auth/error-page/error-page.component';
import {AuthGuardService} from "./service/auth-guard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {NgxLoadingModule} from 'ngx-loading';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsideComponent } from './component/home/components/aside/aside.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {InlineSVGModule} from "ng-inline-svg";
import {SplashScreenModule} from "./partials/layout/splash-screen/splash-screen.module";
import {ExtrasModule} from "./partials/layout/extras/extras.module";
import {LayoutModule} from "./component/home/components/layout.module";
import {SubheaderModule} from "./partials/layout/subheader/subheader.module";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
    AsideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    SplashScreenModule,
    ExtrasModule,
    LayoutModule,
    SubheaderModule,
    TranslateModule.forRoot(),

  ],
  providers: [AuthGuardService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {
      provide: HTTP_INTERCEPTORS,

      useClass: AuthInterceptor,

      multi: true

    },
    JwtHelperService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          json: () => import('highlight.js/lib/languages/json')
        },
      },
    },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
