import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IEvent } from '../../../../interfaces/posts/event.';
import { PostService } from '../../../../services/post.service';
import { StorageService } from '../../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: ` <section id="sec1">
      <h2>Eventos cadastrados</h2>
      <p>
        <button class="customBtn">
          <a link="/cadastro" target="_blank">Cadastre-se</a>
        </button>
        para criar posts aqui
      </p>
      <div id="pagesBtn">
        <button
          class="customBtn btnAct"
          #attEvents
          [disabled]="isSubmitEvents"
          (click)="getEvents()"
        >
          Atualizar
        </button>
        <button class="customBtn btnAct" (click)="prevEvents()"><</button>
        <span>{{ page }}</span>
        <button class="customBtn btnAct" (click)="passEvents()">></button>
      </div>
      @if(events.length > 0) {
      <ul [class]="events.length > 1 ? 'ulList uln' : 'ulList ul1'">
        @for (event of events; track $index) {
        <li class="liBig">
          @if (event.images.length > 0) {
          <img
            class="img"
            src="{{ event.images[0] }}"
            alt="Imagem de pousada"
          />
          } @else {
          <img class="img" src="assets/images/noImage.jpeg" alt="Sem imagem" />
          }
          <div class="dContent">
            <h3>{{ event.title }}</h3>
            <span>
              Postado em {{ event.createdAt | date : 'dd/MM/yyyy' }}
            </span>
            <ul>
              @if (event.eventDate) {
              <li>
                <img
                  src="assets/icons/calendar.svg"
                  alt="ícone de calendário"
                />
                {{ event.eventDate | date : 'dd/MM/yyyy' }}
              </li>
              } @if (event.eventDate) {
              <li>
                <img src="assets/icons/clock.svg" alt="ícone de relógio" />
                {{ event.eventDate | date : 'HH:mm' }}
              </li>
              } @if (event.eventLocation) {
              <li>
                <img src="assets/icons/map.svg" alt="ícone de localização" />
                {{ event.eventLocation }}
              </li>
              }
            </ul>
            <div class="divSocial">
              @if (event.phone || event.instagram) { @if (event.phone &&
              event.phone.trim() !== '') {
              <button>
                <a href="{{ event.phone }}"
                  ><img
                    class="iconBtn"
                    src="assets/icons/whatsapp.svg"
                    alt="ícone do whatsapp"
                /></a>
              </button>
              } @if (event.instagram && event.instagram.trim() !== '') {
              <button>
                <a href="{{ event.instagram }}"
                  ><img
                    class="iconBtn"
                    src="assets/icons/instagram.svg"
                    alt="icone do instagram"
                /></a>
              </button>
              } }
              <button class="customBtn btnAct" (click)="goToDetails(event)">
                Saiba Mais
              </button>
            </div>
          </div>
        </li>
        }
      </ul>
      } @else {
      <p>Nenhum post encontrado</p>
      }
    </section>
    <section id="sec2">
      <h2 id="about">Eventos da cidade</h2>

      <article>
        <figure>
          <img
            class="img"
            src="./assets/images/papangu.JPG"
            alt="Imagens de papangu no carnaval"
          />
          <figcaption>Papangus no Carnaval</figcaption>
        </figure>
        <div>
          <h3>Carnaval</h3>
          <p class="pInformation">
            O carnaval de Martins acontece no mês de fevereiro e é conhecido por
            seus papangus, que são figuras mascaradas que percorrem as ruas da
            cidade. As ruas são enfeitadas com bandeirinhas e os moradores e
            turistas se divertem com os blocos de rua e as brincadeiras das
            crianças, lotando as ruas da praça central.
          </p>
        </div>
      </article>

      <article>
        <div>
          <h3>São João</h3>
          <p class="pInformation">
            O são joão é conhecido por suas festas juninas, com quadrilhas,
            comidas típicas e muita animação. As festas acontecem no mês de
            junho, em diversos bairros da cidade e são abertas ao público, com
            muita música, dança e alegria.
          </p>
        </div>
        <figure>
          <img
            class="img"
            src="./assets/images/quadrilha.png"
            alt="Quadrilha de festa junina"
          />
          <figcaption>Quadrilha Lampião de Gás</figcaption>
        </figure>
      </article>

      <article>
        <figure>
          <img
            class="img"
            src="./assets/images/festival1.jpg"
            alt="Imagem de uma quadrilha de são joão no festival gastronômico"
          />
          <figcaption>
            Apresentação de quadrilha no Festival Gastronômico
          </figcaption>
        </figure>
        <div>
          <h3>Festival Gastronômico</h3>
          <p class="pInformation">
            O festival gastronômico é um evento que acontece no mês de julho e
            reúne diversos pratos típicos da região, além de apresentações
            culturais e shows musicais. Geralmente acontece na praça central da
            cidade e é um evento muito aguardado em todo o estado.
          </p>
        </div>
      </article>

      <article>
        <div>
          <h3>Dia da Independência</h3>
          <p class="pInformation">
            O desfile cívico de 7 de setembro é uma tradição em Martins e reúne
            escolas municipais, estaduais, particulares e instituições da cidade
            que desfilam pela praça principal.
          </p>
        </div>
        <figure>
          <img
            class="img"
            src="./assets/images/desfile1.JPG"
            alt="Desfile cívico de 7 de setembro"
          />
          <figcaption>Desfile Cívico de 7 de Setembro</figcaption>
        </figure>
      </article>

      <article>
        <figure>
          <img
            class="img"
            src="assets/images/festa padroeira1.jpeg"
            alt="Banda Nair Austero Soares"
          />
          <figcaption>
            Apresentação da Banda Nair Austero Soares em Frente a Igreja
          </figcaption>
        </figure>
        <div>
          <h3>Festa Da Padroeira</h3>
          <p class="pInformation">
            A festa da padroeira é uma das maiores festas da cidade e geralmente
            começa no final de dezembro e se estende até o dia 6 de janeiro, com
            shows musicais, apresentações culturais e religiosas, barracas de
            comidas, brinquedos, produtos e muita animação.
          </p>
        </div>
      </article>
    </section>`,
  styleUrl: './events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  events: IEvent[] = [];
  page: number = 1;
  isSubmitEvents: boolean = false;

  @ViewChild('attEvents') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly posts: PostService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly storage: StorageService
  ) {}

  async ngOnInit() {
    await this.getPost();
  }

  async getPost() {
    const storedEvents = this.storage.getPost('event') as IEvent[];
    if (Array.isArray(storedEvents)) {
      this.events = storedEvents;
    } else {
      this.events = [];
    }
  }

  passEvents() {
    this.page++;
    this.getEvents();
  }

  prevEvents() {
    if (this.page - 1 === 0) this.page = 1;
    else this.page--;
    this.getEvents();
  }

  async getEvents() {
    this.isSubmitEvents = true;
    this.submitButton.nativeElement.style.cursor = 'wait';
    this.posts.getAllPosts('event'   ,this.page).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.events = response as IEvent[];
          this.storage.setPost('event', this.events);
        } else {
          this.events = [];
        }
      },
      error: (error) => {
        console.error('Get events failed', error);
      },
      complete: () => {
        this.isSubmitEvents = false;
        this.submitButton.nativeElement.style.cursor = 'pointer';
        this.cdr.markForCheck();
      },
    });
  }

  goToDetails(event: IEvent) {
    this.router.navigate(['/detalhes'], {
      queryParams: {
        event: JSON.stringify(event),
      },
    });
  }
}
