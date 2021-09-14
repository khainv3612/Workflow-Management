import {AsideDynamicComponent} from "./aside-dynamic/aside-dynamic.component";
import {CommonModule} from "@angular/common";
import {InlineSVGModule} from "ng-inline-svg";
import {NgbDropdownModule, NgbProgressbarModule} from "@ng-bootstrap/ng-bootstrap";
import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {HeaderMobileComponent} from "./header-mobile/header-mobile.component";
import {TopbarComponent} from "./topbar/topbar.component";
import {HeaderMenuComponent} from "./header/header-menu/header-menu.component";
import {ScriptsInitComponent} from "../init/scipts-init/scripts-init.component";
import {LanguageSelectorComponent} from "./topbar/language-selector/language-selector.component";
import {ExtrasModule} from "../../../partials/layout/extras/extras.module";
import {RouterModule} from "@angular/router";
import {PagesRoutingModule} from '../pages-routing.module';
import {HeaderMenuDynamicComponent} from "./header/header-menu-dynamic/header-menu-dynamic.component";

@NgModule({
  declarations: [
    AsideDynamicComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMobileComponent,
    TopbarComponent,
    HeaderMenuComponent,
    ScriptsInitComponent,
    LanguageSelectorComponent,
    HeaderMenuDynamicComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    RouterModule,
    PagesRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderMobileComponent,
    AsideDynamicComponent,
    HeaderComponent,
    ScriptsInitComponent
  ]
})
export class LayoutModule {
}
