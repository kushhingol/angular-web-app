import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CommentsComponent }]),
  ],
})
export class CommentsModule {}
