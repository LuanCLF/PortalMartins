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
        <figure>
          <img
            id="imgMap"
            class="img headerImg"
            src="assets/images/maps.png"
            alt="Imagem da cidade no google maps"
          />
        </figure>
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
      <article Id="art2">
        <ul>
          <li>
            <img
              class="icons"
              src="assets/icons/handbag.svg"
              alt="icone de mala de viagem"
            />
            <div>
              <h3>Cidade Turistica</h3>
              <p>Diversas opções de lazer, cultura e gastronomia</p>
            </div>
          </li>
          <li>
            <img
              class="icons"
              src="assets/icons/local.svg"
              alt="icone de ponteiro de local"
            />
            <div>
              <h3>Localização Incrível</h3>
              <p>
                Vistas incríveis e paisagens naturais, com o maior aquapark do
                RN a 16 minutos da cidade
              </p>
            </div>
          </li>
          <li>
            <img
              class="icons"
              src="assets/icons/thermometer.svg"
              alt="icone de termômetro"
            />
            <div>
              <h3>Clima Agradável</h3>
              <p>Temperaturas amenas e uma cidade arborizada</p>
            </div>
          </li>
        </ul>
      </article>
    </section>
  </header>`,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
