import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgMaterial } from './NgMaterial'
import 'hammerjs';

import { AppComponent } from './app.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    NgMaterial
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
