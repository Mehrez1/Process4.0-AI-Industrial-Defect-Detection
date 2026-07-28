import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // ← MANQUAIT

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassificationComponent } from './classification/classification.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule              // ← AJOUT ICI
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
