import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatCardModule, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatToolbarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
})
export class MaterialBundleModule { }