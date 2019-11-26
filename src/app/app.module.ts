import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverlayExampleModule} from './overlay-example/overlay-example.module';
import { GridExampleComponent } from './grid-example/grid-example.component';
import {FormGridModule} from './form-grid/form-grid.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GridExampleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OverlayExampleModule,
    FormGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
