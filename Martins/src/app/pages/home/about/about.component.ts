import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: ` <section>
    <h2 id="about">Sobre a cIdade</h2>

    <article id="arta1">
      <figure>
        <img
          class="img"
          src="./assets/images/martins.jpg"
          alt="Pôr do Sol do Diadema"
        />
        <figcaption>Pôr do Sol do Diadema</figcaption>
      </figure>
      <p >
        Localizado no interior do estado do Rio Grande do Norte, Brasil, a
        aproximadamente 370 km da capital, Natal. Conhecida como a “Princesa
        Serrana” e “Campos do Jordão do Rio Grande do Norte”, Martins é famosa
        por seu clima agradável, especialmente em contraste com as regiões
        vizinhas.
      </p>
    </article>

    <article id="arta2">
      <p >
        A cidade é um destino turístico popular, destacando-se pelo turismo de
        aventura e pela segunda maior caverna de mármore do país, a Casa de
        Pedra, com 100 metros de comprimento. Além disso, Martins realiza um
        festival gastronômico de rua nos mês julho, considerado o maior do
        estado. Outro evento cultural importante é a festa da padroeira Nossa
        Senhora da Conceição, que ocorre entre o final de dezembro e o início de
        janeiro.
      </p>
      <ul>
        <li>
          <figcaption>
            <img
              class="img imgT"
              src="./assets/images/casa de pedra.jpeg"
              alt="Casa de Pedra"
            />
            <figcaption>Casa de Pedra</figcaption>
          </figcaption>
        </li>
        <li class="imgf">
          <figcaption>
            <img
              class="img imgT"
              src="./assets/images/caldeirao.png"
              alt="Festival Gastronômico"
            />
            <figcaption>Festival Gastronômico</figcaption>
          </figcaption>
        </li>
        <li class="imgf">
          <figcaption>
            <img
              class="img imgT"
              src="./assets/images/festa.jpeg"
              alt="Festa da Padroeira"
            />
            <figcaption>Festa da Padroeira</figcaption>
          </figcaption>
        </li>
      </ul>
    </article>

    <article id="arta3">
      <figure>
        <img
          class="img"
          src="./assets/images/capela.jpg"
          alt="Capela Nossa Senhora do Rosário"
        />
        <figcaption>Igreja do Rosário</figcaption>
      </figure>
      <p >
        Martins foi fundada em 1841 e possui uma rica história, com várias
        mudanças de nome ao longo dos anos até se estabelecer como Martins em
        1890, em homenagem a Francisco Martins de Roriz, fundador da Capela de
        Nossa Senhora da Rosário.
      </p>
    </article>
  </section>`,
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
