import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  incorrectLogin = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        if(username == 'admin' && password == 'admin'){
          this.router.navigate(['/home']);
        } else {
          this.incorrectLogin = true;
        }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
