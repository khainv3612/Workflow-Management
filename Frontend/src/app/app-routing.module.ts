import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/auth/login/login.component";
import {RegisterComponent} from "./component/auth/register/register.component";
import {HomeComponent} from "./component/home/home.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {Constant} from "./constant";


export const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuardService],
    loadChildren: () =>
      import('../app/component/home/components/layout.module').then((m) => m.LayoutModule)
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
