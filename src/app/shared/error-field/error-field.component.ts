import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.css']
})
export class ErrorFieldComponent {
  @Input() formField?: FormControl<any>

  errField(): String {
    const control = this.formField

    if (
      !control ||
      !control.errors ||
      !control.dirty ||
      !control.touched
    ) {
      return ''
    }

    if (control.getError('required')) {
      return 'This field is required'
    }

    const maxLengthErr = control.getError('maxlength')
    if (control.getError('maxlength')) {
      return `Name must be shorter then ${maxLengthErr.requiredLength}`
    }

    const minLengthErr = control.getError('minlength')
    if (control.getError('minlength')) {
      return `Name must be longer then ${minLengthErr.requiredLength}`
    }

    if (control.getError('email')) {
      return 'Email is not valid'
    }

    if (control.getError('pattern')) {
      return 'Phone number is invalid'
    }

    return ''
  }
}
