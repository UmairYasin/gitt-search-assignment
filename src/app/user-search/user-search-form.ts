import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export class UserSearchForm  {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup = this.fb.group({
      query: ['', Validators.required],
    });
  }
}
