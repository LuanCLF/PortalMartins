import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Nossos Serviços</h2>
      <article id="arts1">
        <figure>
          <img class="img" src="assets/images/pousada.jpg" alt="Pousada" />
          <figcaption>Pousada Rancho da Serra</figcaption>
        </figure>
        <div>
          <h3>Hospedagem, Aluguel ou Compra</h3>
          <p>
            A cidade oferece uma variedade de opções de hospedagem, aluguel e
            compra de imóveis para atender às necessidades de qualquer família
            ou pessoa. Hotéis, pousadas, casas de temporada e apartamentos,
            garantindo o conforto e a segurança de todos os hóspedes. Existe uma
            grande variedade de opções para todos os gostos e bolsos.
          </p>
          <button class="customBtn">
            <a href="/hospedagem" target="_self">Mais Informações</a>
          </button>
        </div>
      </article>
      <article id="arts2">
        <figure>
          <img class="img" src="assets/images/sanduiche.jpg" alt="Refeição" />
          <figcaption>Sanduíche do "Ao Gosto do Chefe"</figcaption>
        </figure>
        <div>
          <h3>Restaurantes e Lanchonetes Locais</h3>
          <p>
            A cidade oferece uma variedade de opções de restaurantes e
            lanchonetes para atender às necessidades de qualquer família ou
            pessoa. Restaurantes, lanchonetes, bares e padarias, garantindo o
            conforto e a segurança de todos os clientes. Existe uma grande
            variedade de opções para todos os gostos e bolsos.
          </p>
          <button class="customBtn">
            <a href="/alimentacao" target="_self">Mais Informações</a>
          </button>
        </div>
      </article>
      <article id="arts3">
        <figure>
          <img
            class="img"
            src="./assets/images/festival.jpg"
            alt="Festival gastronômico de martins"
          />
          <figcaption>
            Um Restaurante no Festival Gastronômico de Martins
          </figcaption>
        </figure>
        <div>
          <h3>Eventos</h3>
          <p>
            A cidade oferece uma variedade de opções de eventos para atender às
            necessidades de qualquer família ou pessoa. Festivais, shows, feiras
            e competições, garantindo o conforto e a segurança de todos os
            participantes. Existe uma grande variedade de opções para todos os
            gostos e bolsos.
          </p>
          <button class="customBtn">
            <a href="/eventos" target="_self">Mais Informações</a>
          </button>
        </div>
      </article>
    </section>
  `,
  styleUrl: './services.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {}
