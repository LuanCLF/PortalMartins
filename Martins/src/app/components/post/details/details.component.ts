import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHosting } from '../../../interfaces/posts/hosting.';
import { IFeeding } from '../../../interfaces/posts/feeding.';
import { IEvent } from '../../../interfaces/posts/event.';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: ` <header>
      <nav>
        <button class="customBtn"><a [href]="back">Voltar</a></button>
      </nav>
    </header>
    <section>
      @if (host) {
      <h1>{{ host.title }}</h1>
      <article class="art1">
        <div>
          @if (host.images.length > 0) {
          <img
            class="img  imgBig"
            src="{{ host.images[0] }}"
            alt="Imagem de pousada"
          />
          } @else {
          <img
            class="img imgBig"
            src="assets/images/noImage.jpeg"
            alt="Sem imagem"
          />
          }
        </div>

        <article class="artDetails">
          <ul>
            @if (host.bedrooms > 0) {
            <li>Quartos: {{ host.bedrooms }}</li>
            } @if (host.bathroom > 0) {
            <li>Banheiros: {{ host.bathroom }}</li>
            } @if (host.vacancy > 0) {
            <li>Vagas p/ Veículo: {{ host.vacancy }}</li>
            } @if (host.serviceArea) {
            <li>
              Área de Serviço
              <img src="assets/icons/check.svg" alt="" />
            </li>
            } @if (host.kitchen) {
            <li>
              Cozinha <img src="assets/icons/check.svg" alt="" />
            </li>
            } @if (host.garden) {
            <li>
              Jardim <img src="assets/icons/check.svg" alt="" />
            </li>
            }
          </ul>
          <p>{{ host.description }}</p>

          <span class="spanDate">
            Postado em {{ host.createdAt | date : 'dd/MM/yyyy' }} -
            {{ host.location }}
            <span>
              @if (host.phone || host.instagram) { @if (host.phone &&
              host.phone.trim() !== '') {
              <button class="iconBtn">
                <a href="{{ host.phone }}"
                  ><img src="assets/icons/whatsapp.svg" alt="Ícone do whatsapp"
                /></a>
              </button>
              } @if (host.instagram && host.instagram.trim() !== '') {
              <button class="iconBtn">
                <a href="{{ host.instagram }}"
                  ><img
                    src="assets/icons/instagram.svg"
                    alt="Ícone do instagram"
                /></a>
              </button>
              } }
            </span></span
          >
        </article>
      </article>
      <article class="art2">
        @if(host.images.length > 1) {
        <h3>Outras imagens</h3>
        <ul>
          @for (image of host.images; track $index) { @if ($index > 0) {
          <li>
            <img class="img" src="{{ image }}" alt="Imagem da hospedagem" />
          </li>
          } }
        </ul>
        }
      </article>
      } @if (feed) {
      <h1>{{ feed.title }}</h1>
      <article class="art1">
        <div>
          @if (feed.images.length > 0) {
          <img
            class="img imgBig"
            src="{{ feed.images[0] }}"
            alt="Imagem de alimentação"
          />
          } @else {
          <img
            class="img imgBig"
            src="assets/images/noImage.jpeg"
            alt="Sem imagem"
          />
          }
        </div>
        <article class="artDetails">
          <ul>
            @if (feed.type) {
            <li>Tipo: {{ feed.type }}</li>
            } @if (feed.wifi) {
            <li>
              Wi-fi <img src="assets/icons/check.svg" alt="" />
            </li>
            } @if (feed.delivery) {
            <li>
              Delivery <img src="assets/icons/check.svg" alt="" />
            </li>
            } @if (feed.parking) {
            <li>
              Estacionamento
              <img src="assets/icons/check.svg" alt="" />
            </li>
            }
          </ul>
          <p>{{ feed.description }}</p>
          <span class="spanDate">
            Postado em {{ feed.createdAt | date : 'dd/MM/yyyy' }} -
            {{ feed.location }}

            <span>
              @if (feed.phone || feed.instagram) { @if (feed.phone &&
              feed.phone.trim() !== '') {
              <button class="iconBtn">
                <a href="{{ feed.phone }}"
                  ><img src="assets/icons/whatsapp.svg" alt="Ícone do whatsapp"
                /></a>
              </button>
              } @if (feed.instagram && feed.instagram.trim() !== '') {
              <button class="iconBtn">
                <a href="{{ feed.instagram }}"
                  ><img
                    src="assets/icons/instagram.svg"
                    alt="icone do instagram"
                /></a>
              </button>
              } }
            </span>
          </span>
        </article>
      </article>
      <article class="art2">
        @if(feed.images.length > 1) {
        <h3>Outras imagens</h3>
        <ul>
          @for (image of feed.images; track $index) { @if ($index > 0) {
          <li>
            <img
              class="img"
              src="{{ image }}"
              alt="Imagem do estabelecimento"
            />
          </li>
          } }
        </ul>
        }
      </article>
      } @if (event) {
      <h1>{{ event.title }}</h1>
      <article class="art1">
        <div>
          @if (event.images.length > 0) {
          <img
            class="img imgBig"
            src="{{ event.images[0] }}"
            alt="Imagem de evento"
          />
          } @else {
          <img
            class="img imgBig"
            src="assets/images/noImage.jpeg"
            alt="Sem imagem"
          />
          }
        </div>

        <article class="artDetails">
          <ul>
            @if (event.eventDate) {
            <li>Dia: {{ event.eventDate | date : 'dd/MM/yyyy' }}</li>
            } @if (event.eventDate) {
            <li>Horário: {{ event.eventDate | date : 'HH:mm' }}</li>
            } @if (event.eventLocation) {
            <li>Local: {{ event.eventLocation }}</li>
            }
          </ul>
          <p>{{ event.description }}</p>

          <span class="spanDate">
            Postado em {{ event.createdAt | date : 'dd/MM/yyyy' }} -
            {{ event.location }}
            <span>
              @if (event.phone || event.instagram) { @if (event.phone &&
              event.phone.trim() !== '') {
              <button class="iconBtn">
                <a href="https://wa.me/55{{ event.phone }}"
                  ><img src="assets/icons/whatsapp.svg" alt="Ícone do whatsapp"
                /></a>
              </button>
              } @if (event.instagram && event.instagram.trim() !== '') {
              <button class="iconBtn">
                <a href="{{ event.instagram }}"
                  ><img
                    src="assets/icons/instagram.svg"
                    alt="icone do instagram"
                /></a>
              </button>
              } }
            </span></span
          >
        </article>
      </article>
      <article class="art2">
        @if(event.images.length > 1) {
        <h3>Outras imagens</h3>
        <ul>
          @for (image of event.images; track $index) { @if ($index > 0) {
          <li>
            <img class="img" src="{{ image }}" alt="Imagem do evento" />
          </li>
          } }
        </ul>
        }
      </article>
      }
    </section>`,
  styleUrl: './details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit{
  @Input() host?: IHosting = undefined;
  @Input() feed?: IFeeding = undefined;
  @Input() event?: IEvent = undefined;
  back: string = '';

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.host = params['host'] ? JSON.parse(params['host']) : undefined;
      this.feed = params['feed'] ? JSON.parse(params['feed']) : undefined;
      this.event = params['event'] ? JSON.parse(params['event']) : undefined;

      if (this.host) this.back = '/hospedagem';
      if (this.feed) this.back = '/alimentacao';
      if (this.event) this.back = '/eventos';
    });
  }
}
