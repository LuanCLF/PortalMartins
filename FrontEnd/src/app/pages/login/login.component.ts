import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavComponent } from '../../components/nav/nav.component';
import { UserService } from '../../services/user.service';
import { UtilsService } from '../../services/utils.service';
import { IUserLoginRQ } from '../../interfaces/user.';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  template: `
    <header>
      <app-nav></app-nav>
    </header>
    <main>
      <img src="assets/icons/login.svg" alt="" />
      <section>
        <h1>Login</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="Insira seu email"
              required
            />
            <span class="messageErrorOff" id="invalidEmail"></span>
          </div>
          <div>
            <label for="password">Senha:</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Insira sua senha"
              required
            />
            <span class="messageErrorOff" id="invalidPassword"></span>
          </div>
          <button
            class="customBtn btnAct"
            type="submit"
            #submitButton
            [disabled]="isSubmitting"
          >
            Acessar minha conta
          </button>
          <span class="messageErrorOff" id="loginFail"
            >O login falhou, tente novamente</span
          >
        </form>
      </section>
    </main>
  `,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly utils: UtilsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')!;
    const password = this.loginForm.get('password')!;

    if (email.invalid) this.emailInvalid(true, 'Email inválido');
    else this.emailInvalid(false);

    if (password.invalid)
      this.passwordInvalid(true, 'Min 6 e max 20 caracteres');
    else this.passwordInvalid(false);

    if (this.loginForm.valid) {
      const user: IUserLoginRQ = {
        email: email.value,
        password: password.value,
      };

      this.isSubmitting = true;
      this.submitButton.nativeElement.style.cursor = 'wait';

      this.userService.login(user).subscribe({
        next: (response) => {
          this.submitButton.nativeElement.style.cursor = 'pointer';
          this.isSubmitting = false;
          this.loginFailed(false);
        },
        error: (error) => {
          if (error.conflict) {
            if (error.status === 404) this.emailInvalid(true, error.message);
            else if (error.status === 401)
              this.passwordInvalid(true, error.message);
          }
          console.error('Login failed', error);
          this.loginFailed(true);
          this.submitButton.nativeElement.style.cursor = 'pointer';
          this.isSubmitting = false;
        },
      });
    }
  }

  emailInvalid(bool: boolean, message?: string) {
    const emailInput = document.getElementById('email')!;
    const invalidSpan = document.getElementById('invalidEmail')!;
    bool
      ? emailInput.classList.add('inputErrorOn')
      : emailInput.classList.remove('inputErrorOn');
    bool
      ? invalidSpan.classList.add('messageErrorOn')
      : invalidSpan.classList.remove('messageErrorOn');
    if (message) invalidSpan.innerText = message;
  }

  passwordInvalid(bool: boolean, message?: string) {
    const passwordInput = document.getElementById('password')!;
    const invalidSpan = document.getElementById('invalidPassword')!;
    bool
      ? passwordInput.classList.add('inputErrorOn')
      : passwordInput.classList.remove('inputErrorOn');
    bool
      ? invalidSpan.classList.add('messageErrorOn')
      : invalidSpan.classList.remove('messageErrorOn');
    if (message) invalidSpan.innerText = message;
  }

  loginFailed(bool: boolean) {
    const loginFail = document.getElementById('loginFail')!;
    bool
      ? loginFail.classList.add('messageErrorOn')
      : loginFail.classList.remove('messageErrorOn');
  }
}
