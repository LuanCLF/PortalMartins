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
import { IUserCreateRQ } from '../../interfaces/user.';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavComponent],
  template: ` <header>
      <app-nav></app-nav>
    </header>
    <main>
      <img
        src="assets/icons/signup.svg"
        alt="Imagem de uma mulher se cadastrando"
      />
      <section>
        <h1>Cadastro</h1>
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div>
            <label for="name">Nome:</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              placeholder="Seu nome"
              required
            />
            <span class="messageErrorOff" id="invalidName"
              >Min 3 letras, max 150 letras</span
            >
          </div>
          <div>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="Seu email"
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
              placeholder="No mínimo 6 dígitos"
              required
            />
            <span class="messageErrorOff" id="invalidPassword"
              >Min 6 e max 20 caracteres</span
            >
          </div>
          <div>
            <label for="cameFrom">Por onde veio? (opcional)</label>
            <input
              type="text"
              id="cameFrom"
              formControlName="cameFrom"
              placeholder="Pessoa, instagram, etc"
            />
          </div>
          <div>
            <label for="whatIsIt">O que você é? (opcional)</label>
            <select
              id="whatIsIt"
              formControlName="whatIsIt"
              value="Pessoa"
              placeholder="O que você é?"
            >
              <option value="Pessoa">Pessoa</option>
              <option value="Empresa">Empresa</option>
            </select>
          </div>
          <button
            class="customBtn"
            type="submit"
            #submitButton
            [disabled]="isSubmitting"
          >
            Cadastrar
          </button>
          <span class="messageErrorOff" id="registerFail"
            >O Cadastro falhou, tente novamente</span
          >
        </form>
      </section>
    </main>`,
  styleUrl: './create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  signupForm: FormGroup;
  isSubmitting = false;

  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly utils: UtilsService
  ) {
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
          Validators.pattern('^[a-zA-Z ]*$'),
          this.utils.noWhitespaceValidator,
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.utils.noWhitespaceValidator,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          this.utils.noWhitespaceValidator,
        ],
      ],
      cameFrom: ['', [Validators.minLength(1), Validators.maxLength(50)]],
      whatIsIt: [''],
    });
  }

  onSubmit() {
    const name = this.signupForm.get('name')!;
    const email = this.signupForm.get('email')!;
    const password = this.signupForm.get('password')!;

    if (name.invalid || name.value.trim() === 0) this.nameInvalid(true);
    else this.nameInvalid(false);

    if (email.invalid || email.value.trim() === 0)
      this.emailInvalid(true, 'Email inválido');
    else this.emailInvalid(false);

    if (password.invalid || password.value.trim() === 0)
      this.passwordInvalid(true);
    else this.passwordInvalid(false);

    if (this.signupForm.valid) {
      const user: IUserCreateRQ = {
        name: this.utils.removeWhitespace(name.value),
        email: this.utils.removeWhitespace(email.value),
        password: this.utils.removeWhitespace(password.value),
        cameFrom: this.signupForm.get('cameFrom')?.value,
        whatIsIt: this.signupForm.get('whatIsIt')?.value,
      };

      this.isSubmitting = true;
      this.submitButton.nativeElement.style.cursor = 'wait';

      this.userService.create(user).subscribe({
        next: () => {
          this.submitButton.nativeElement.style.cursor = 'pointer';
          this.isSubmitting = false;
          this.registerFailed(false);
        },
        error: (error) => {
          if (error.status === 409)
            this.emailInvalid(true, 'Email já cadastrado');
          else if (error.conflict) this.emailInvalid(true, error.message);
          else console.error('User registration failed');
          this.registerFailed(true);
          this.submitButton.nativeElement.style.cursor = 'pointer';
          this.isSubmitting = false;
        },
      });
    }
  }

  nameInvalid(bool: boolean) {
    const invalidSpan = document.getElementById('invalidName')!;
    bool
      ? invalidSpan.classList.add('messageErrorOn')
      : invalidSpan.classList.remove('messageErrorOn');
  }

  emailInvalid(bool: boolean, message?: string) {
    const invalidSpan = document.getElementById('invalidEmail')!;
    bool
      ? invalidSpan.classList.add('messageErrorOn')
      : invalidSpan.classList.remove('messageErrorOn');
    if (message) invalidSpan.innerText = message;
  }

  passwordInvalid(bool: boolean) {
    const invalidSpan = document.getElementById('invalidPassword')!;
    bool
      ? invalidSpan.classList.add('messageErrorOn')
      : invalidSpan.classList.remove('messageErrorOn');
  }

  registerFailed(bool: boolean) {
    const registerFail = document.getElementById('registerFail')!;
    bool
      ? registerFail.classList.add('messageErrorOn')
      : registerFail.classList.remove('messageErrorOn');
  }
}
