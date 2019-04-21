import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentsComponent } from './components/contents/contents.component';
import { ElementsComponent } from './components/elements/elements.component';
import { AuthGuard } from 'src/services/auth.guard';

const routes: Routes = [
  { path: '', component: ElementsComponent },
  { path: 'contents', component: ContentsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
