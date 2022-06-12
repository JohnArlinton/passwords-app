import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Password } from 'src/app/state/passwords/passwords.state';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.css'],
})
export class DialogCardComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCardComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { edit: boolean; item: Password; buttonFn: Function },
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.passwordForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(reg)]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.data.edit) {
      let obj: keyof Password;
      for (obj in this.data.item) {
        obj != 'id' &&
          this.passwordForm.controls[obj].setValue(this.data.item[obj]);
      }
    }
  }

  hide = true;

  getErrorMessage(error: any) {
    if (error) {
      if (error.hasOwnProperty('required')) {
        return 'You must enter a value';
      } else if (error.hasOwnProperty('pattern')) {
        return 'You must enter a valid url';
      } else if (error.hasOwnProperty('minlength')) {
        return 'Password must be at least 4 characters long';
      } else {
        return '';
      }
    }
    return '';
  }

  submitPassword() {
    var form = this.data.edit
      ? {
          id: this.data.item.id,
          ...this.passwordForm.value,
        }
      : { ...this.passwordForm.value };
    this.dialogRef.close({ form });
  }
}
