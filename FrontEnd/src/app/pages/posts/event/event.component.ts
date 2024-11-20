import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from '../../../components/post/header/header.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, HeaderComponent, EventsComponent],
  template: `
    <app-header
      titlePart1="Os Melhores"
      titlePart2="Eventos"
      subtext="Acompanhe os melhores eventos da região, e fique por dentro de tudo que acontece"
      image="/assets/images/desfile.JPG"
      imgAlt="Imagem de um desfile cívico na cidade de Martins"
      c1Title="Eventos Especiais"
      c1Text="Mais de 5 grandes eventos por ano, com muita festa e alegria"
      c2Title="Cidade Decorada"
      c2Text="A cidade reflete aquilo que está acontecendo, e se enfeita para a festa"
      c3Title="Organização e Segurança"
      c3Text="Eventos organizados e seguros, para que você possa aproveitar sem preocupação"
    ></app-header>
    <main>
      <app-events></app-events>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {}
