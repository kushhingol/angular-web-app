import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AlbumsComponent }]),
  ],
})
export class AlbumsModule {}
