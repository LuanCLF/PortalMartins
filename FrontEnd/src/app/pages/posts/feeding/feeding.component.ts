import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { HeaderComponent } from '../../../components/post/header/header.component';

@Component({
  selector: 'app-feeding',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    EstablishmentsComponent
  ],
  template: `
      <app-header
      titlePart1="Acabe Com"
      titlePart2="Sua Fome"
      subtext="Encontre restaurantes, lanchonetes, docerias e mirantes com as melhores refeições para sua família e amigos"
      image="/assets/images/carne de sol.jpeg"
      imgAlt="Imagem de carne de sol com macaxeira frita"
      c1Title="Variedade"
      c1Text="Opções que agradam todos os paladares e bolsos"
      c2Title="Contato Direto"
      c2Text="Acesso ao contato de todos os estabelecimentos"
      c3Title="Facilidade"
      c3Text="Navegação simples e intuitiva para encontrar o lugar ideal"
    ></app-header>
  <main>
  <app-establishments></app-establishments>
  </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedingComponent { }
