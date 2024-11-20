import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
      <ul Id="acess">
        <ng-container *ngIf="!loggedIn(); else loggedInTemplate">
          <li>
            <a href="/login">Login <span></span></a>
          </li>
          <li>
            <a href="/cadastro">Registrar <span></span></a>
          </li>
        </ng-container>
        <ng-template #loggedInTemplate>
          <li>
            <a href="/perfil">Perfil <span></span></a>
          </li>
          <li>
            <a href="#" (click)="logout()">Sair <span></span></a>
          </li>
        </ng-template>
      </ul>

      <div Id="divMenu" (mouseover)="showMenu = true" (mouseout)="hIdeMenu()">
        <button Id="menu-burger">☰</button>
        <ul [class.show]="showMenu">
          <li>
            <a href="/">Página Inicial <span></span></a>
          </li>
          <li>
            <a href="/hospedagem">Hospedagem <span></span></a>
          </li>
          <li>
            <a href="/alimentacao">Alimentação <span></span></a>
          </li>
          <li>
            <a href="/eventos">Eventos <span></span></a>
          </li>
          <li>
            <a href="/contato">Contato <span></span></a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  showMenu = false;

  constructor(private readonly userService: UserService) {}

  hIdeMenu() {
    setTimeout(() => (this.showMenu = false), 500);
  }

  loggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }
}
