import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardContainerComponent } from './dashboard-container.component';

import { DashboardContainerRoutingModule } from './dashboard-routing.module';
import { NavBarComponent } from '../../components/navbar/navbar.component';

@NgModule({
  declarations: [DashboardContainerComponent, NavBarComponent],
  imports: [CommonModule, ReactiveFormsModule, DashboardContainerRoutingModule],
})
export class DashboardContainerModule {}
