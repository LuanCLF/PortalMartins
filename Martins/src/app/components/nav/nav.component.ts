import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
      <ul id="acess">
        <ng-container *ngIf="!logged(); else loggedInTemplate">
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

      <div
        id="divMenu"
        (mouseover)="showMenu = true"
        (mouseout)="hideMenu()"
        (focus)="showMenu = true"
        (blur)="hideMenu()"
      >
        <button id="menu-burger">☰</button>
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

  hideMenu() {
    setTimeout(() => (this.showMenu = false), 500);
  }

  logged() {
    return this.userService.isLogged();
  }

  logout() {
    this.userService.logout();
  }
}
