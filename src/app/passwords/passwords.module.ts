import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordsRoutingModule } from './passwords-routing.module';
import { CardModule } from '../shared/components/card/card.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { passwordsReducer } from '../state/passwords/passwords.reducers';
import { PasswordsEffects } from '../state/passwords/passwords.effects';
import { PasswordsComponent } from './passwords.component';
import { DialogCardModule } from '../shared/components/dialog-card/dialog-card.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PasswordsComponent],
  imports: [
    CommonModule,
    PasswordsRoutingModule,
    MatCardModule,
    CardModule,
    DialogCardModule,
    StoreModule.forFeature('passwords', passwordsReducer),
    EffectsModule.forFeature([PasswordsEffects]),
  ],
  // providers: [CharactersService],
})
export class PasswordsModule {}
