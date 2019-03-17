import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmapsApi
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
