import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchPadComponent } from './launch-pad/launch-pad.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-component', pathMatch: 'full' },
  {path: 'lauchpad-component', component:LaunchPadComponent},
  {path: 'home-component', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
