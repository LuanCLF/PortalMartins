import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../../../components/nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NavComponent],
  template: `<header>
    <app-nav></app-nav>
    <section>
      <article id="art1">
        <img
          class="img"
          src="assets/images/maps.png"
          alt="Imagem da cidade no google maps"
        />

        <div>
          <h1 class="h1Header">MARTINS</h1>
          <p>
            Cadastre-se para acompanhar a serra mais fria do alto oeste potiguar
          </p>
          <button class="customBtn">
            <a href="/cadastro" target="_self">Faça Parte</a>
          </button>
        </div>
      </article>
      <article id="art2">
        <ul>
          <li>
            <div>
              <img
                class="icons"
                src="assets/icons/handbag.svg"
                alt="icone de mala de viagem"
              />
              <h3>Cidade Turistica</h3>
            </div>
            <p>Diversas opções de lazer, cultura e gastronomia</p>
          </li>
          <li>
            <div>
              <img
                class="icons"
                src="assets/icons/local.svg"
                alt="icone de ponteiro de local"
              />
              <h3>Localização Incrível</h3>
            </div>
            <p>Lugares e paisagens incríveis ruante todo o ano</p>
          </li>
          <li>
            <div>
              <img
                class="icons"
                src="assets/icons/thermometer.svg"
                alt="icone de termômetro"
              />
              <h3>Clima Agradável</h3>
            </div>
            <p>Temperaturas amenas e uma cidade arborizada</p>
          </li>
        </ul>
      </article>
    </section>
  </header>`,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
