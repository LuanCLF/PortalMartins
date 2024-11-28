import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div id="feedback-icon">
      <a href="https://forms.gle/uTLJ2TZpG47TaTdZ9" target="_blank">
        <img src="assets/icons/feedback.svg" alt="Ícone de Pesquisa" />
      </a>
    </div>
    <router-outlet></router-outlet> `,
  styles: [
    `
      #feedback-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        z-index: 1000;
      }

      #feedback-icon img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        animation: swing 2s ease-in-out infinite;
      }

      @keyframes swing {
        0% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(15deg);
        }
        50% {
          transform: rotate(0deg);
        }
        75% {
          transform: rotate(-15deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'Martins';
}
