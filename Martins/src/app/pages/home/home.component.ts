import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AboutComponent, ServicesComponent],
  template: `
    <app-header></app-header>
    <main>
      <app-services></app-services>
      <app-about></app-about>
    </main>
    <div id="warning">
      <div id="warningHeader">
        <H2>AVISO</H2>
        <span class="customBtn btnAct" (click)="closeWarning()">X</span>
      </div>
      <div>
        <p>
          O servidor que mantém e processa os dados dessa página está offline,
          por isso não é possível realizar cadastros, login, nem consultar
          informações. Entre em contato e posso executar o servidor para você.
        </p>
        <button class="customBtn">
          <a href="/contato" target="_self">Conversar</a>
        </button>
      </div>
    </div>
  `,
  styles: `
    #warning {
      position: fixed;
      top: 15%;
      left: 25%;
      right: 25%;
      width: fit-content;
      background-color: var(--color-light);
      display: flex;
      flex-direction: column;

      text-align: center;

      padding: 10px;
      border-radius: 15px;

      button {
        margin-top: 15px;
      }
      #warningHeader {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px;

        h2{
          margin: 0;
        }
        
        span {
          font-weight: bold;
          font-size: 1.6rem;

          padding: 5px 7px;
        }
      }
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  onInit() {
    const warning = document.getElementById('warning');
    warning!.style.display = 'flex';
  }

  closeWarning() {
    const warning = document.getElementById('warning');
    warning!.style.display = 'none';
  }
}
