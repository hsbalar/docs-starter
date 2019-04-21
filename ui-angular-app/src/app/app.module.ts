import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BackendService } from 'src/services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ElementsComponent } from './components/elements/elements.component';
import { ContentsComponent } from './components/contents/contents.component';
import { AccountContext } from 'src/services/account.context';
import { AuthGuard } from 'src/services/auth.guard';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ElementsComponent,
    ContentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [BackendService, AccountContext, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
