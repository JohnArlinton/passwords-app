import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharingService } from './services/sharing.service';

@NgModule({
  imports: [CommonModule],
  providers: [SharingService],
  declarations: [],
})
export class CoreModule {}
