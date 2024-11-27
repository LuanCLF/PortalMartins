import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HostingsComponent } from './hostings/hostings.component';
import { HeaderComponent } from '../../../components/post/header/header.component';

@Component({
  selector: 'app-hosting',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HostingsComponent],
  template: `
    <app-header
      titlePart1="Encontre"
      titlePart2="Seu Lugar"
      subtext="Descubra hotéis, chalés, pousadas e casas de temporada para curtir sua viagem, e também casas para compra e aluguel"
      image="/assets/images/pousada.jpg"
      imgAlt="Imagem de uma pousada"
      c1Title="Variedade"
      c1Text="Opções confortáveis para toda a família, com preços acessíveis"
      c2Title="Contato Direto"
      c2Text="Fale diretamente com os proprietários sem intermediários"
      c3Title="Facilidade"
      c3Text="Navegação simples e intuitiva para encontrar o lugar ideal"
    ></app-header>
    <main>
      <app-hostings></app-hostings>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostingComponent {}
