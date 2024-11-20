import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AboutComponent, ServicesComponent],
  template: ` <app-header></app-header>
    <main>
      <app-services></app-services>
      <app-about></app-about>
    </main>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
