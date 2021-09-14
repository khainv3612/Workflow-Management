import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../directive/ValidationService';
import {ThemeService} from '../../../service/themeService.service';
import {RouterService} from "../../../service/router.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateService: ValidationService;
  form: any = FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isMatchPass = true;
  isValidUsername = true;
  isValidEmail = true;
  isValidPass = true;
  isValidRepass = true;
  isFirstLoad = true;
  isRegisted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private validate: ValidationService, private router: RouterService, private themeService: ThemeService) {
    this.validateService = validate;
    this.form = this.formBuilder.group(
      {
        username: ['', [
          Validators.required,
          Validators.minLength(5), Validators.maxLength(15)
        ]],
        email: ['', [Validators.required, ValidationService.emailValidator]],
        password: ['', [Validators.required, ValidationService.passwordValidator]],
        confirmPassword: ['', [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isFirstLoad = false;
    const {username, email, password} = this.form.value;
    this.validateForm();
    if (!this.form.valid) {
      return;
    }
    const agreeTerm = document.getElementById('agree-term') as HTMLInputElement;
    if (!agreeTerm.checked) {
      agreeTerm.focus();
      return;
    }
    this.themeService.startLoading();
    this.authService.register(username, email, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isRegisted = true;
        // this.router.navigateByUrl('/login');
        this.themeService.stopLoading();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.isRegisted = false;
        this.themeService.stopLoading();
      }
    );
  }

  validateForm(): any {
    if (this.isFirstLoad) {
      return;
    }
    this.isValidUsername = this.form.get('username').valid;
    this.isValidEmail = this.form.get('email').valid;
    this.isValidPass = this.form.get('password').valid;
    this.isValidRepass = this.form.get('confirmPassword').value == this.form.get('password').value;
  }


}

