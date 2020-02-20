import { AuthService, User } from '@mdv-twenty-four/core-data';
import { NotifyService } from '@mdv-twenty-four/core-data';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mdv-twenty-four-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userInfo = { email: 'e@e.com', password: 'pass'}
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notify: NotifyService,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  login() {
    this.notify.notify('Invalid User');
    const inputedUser: User = this.form.value
    if (this.form.invalid) {
    } else {
      if(inputedUser.email === this.userInfo.email && inputedUser.password === this.userInfo.password) {
        this.notify.notify('Successfully logged In');
        this.authservice.setToken(inputedUser.email);
        this.router.navigate(['/pokemon'])
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }
}
