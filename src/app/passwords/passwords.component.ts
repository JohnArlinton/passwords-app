import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialogCardComponent } from '../shared/components/dialog-card/dialog-card.component';
import { SharingService } from '../shared/core/services/sharing.service';
import { AppState, PageState } from '../state/app.state';
import {
  createPassword,
  deletePassword,
  loadPasswords,
  updatePassword,
} from '../state/passwords/passwords.actions';
import { selectAllPasswords } from '../state/passwords/passwords.selector';
import { Password } from '../state/passwords/passwords.state';
import { CreatePassword } from '../types/createPassword';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css'],
})
export class PasswordsComponent implements OnInit {
  data$: Observable<string>;

  allPasswords$ = this.store.select(selectAllPasswords);

  constructor(
    private store: Store<AppState>,
    sharingService: SharingService,
    public dialog: MatDialog
  ) {
    this.data$ = sharingService.searchObservable;
  }

  ngOnInit(): void {
    this.allPasswords$.subscribe((passwordState) => {
      this.passwords = passwordState.passwords.results;
      this.allPasswords = passwordState.passwords.results;
      this.thereIsPasswords = this.passwords.length > 0;
    });
    this.data$.subscribe((text) => {
      this.search = text;
      this.passwords = text
        ? this.allPasswords.filter((el) => el.name.toLowerCase().includes(text))
        : this.allPasswords;
    });

    !this.thereIsPasswords && this.store.dispatch(loadPasswords());
  }

  passwords: Password[] = [];
  allPasswords: Password[] = [];

  search: string = '';

  thereIsPasswords: boolean = false;

  openSaveDialogPassword(): void {
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        edit: false,
        item: {} as Password,
        buttonFn: this.savePassword,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.store.dispatch(createPassword(result.form));
    });
  }

  openEditDialogPassword(item: Password): void {
    const dialogRef = this.dialog.open(DialogCardComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        edit: true,
        item,
        buttonFn: this.editPassword,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.editPassword(result.form);
    });
  }

  cardClicked({ item, type }: { item: Password; type: number }) {
    switch (type) {
      case 2:
        this.openEditDialogPassword(item);
        break;

      case 1:
        this.removePassword(item.id);
        break;

      case 3:
        this.copyToClipboard(item.password);
        break;
    }
  }

  copyToClipboard(text: string) {
    const cb = navigator.clipboard;
    cb.writeText(text);
  }

  savePassword(item: CreatePassword) {
    this.store.dispatch(createPassword(item));
  }

  removePassword(id: number) {
    this.store.dispatch(deletePassword(id));
  }

  editPassword(item: Password) {
    this.store.dispatch(updatePassword(item.id, item));
  }
}
