import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
} from '@angular/material';

const MD_MODULES = [
    BrowserAnimationsModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
]

@NgModule({
  imports: MD_MODULES,
  exports: MD_MODULES
})
export class NgMaterial { }