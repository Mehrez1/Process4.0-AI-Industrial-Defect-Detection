// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationComponent } from './classification/classification.component';

const routes: Routes = [
  { path: '', component: ClassificationComponent }, // Page d'accueil
  { path: 'classification', component: ClassificationComponent }, // Autre route possible // Page par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }