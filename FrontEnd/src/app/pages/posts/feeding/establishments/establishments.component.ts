import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IFeeding } from '../../../../interfaces/posts/feeding.';
import { PostService } from '../../../../services/post.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-establishments',
  standalone: true,
  imports: [CommonModule],
  template: ` <section id="sec1">
    <h2>Os melhores estabelecimentos para você</h2>
    <p>
      <button class="customBtn"><a href="/cadastro">Cadastre-se</a></button>
      para criar posts aqui
    </p>
    <div id="pagesBtn">
      <button
        class="customBtn btnAct"
        #attFeeds
        [disabled]="isSubmitFeeds"
        (click)="getfeedings()"
      >
        Atualizar
      </button>
      <button class="customBtn btnAct" (click)="prevFeeds()"><</button>
      <span>{{ page }}</span>
      <button class="customBtn btnAct" (click)="passFeeds()">></button>
    </div>
    @if(feeds.length > 0) {
    <ul [class]="feeds.length > 1 ? 'ulList uln' : 'ulList ul1'">
      @for (feed of feeds; track $index) {
      <li class="liBig">
        @if (feed.images.length > 0) {
        <img class="img" src="{{ feed.images[0] }}" alt="Imagem de pousada" />
        } @else {
        <img class="img" src="assets/images/noImage.jpeg" alt="Sem imagem" />
        }
        <div class="dContent">
          <h3>{{ feed.title }}</h3>
          <span> Postado em {{ feed.createdAt | date : 'dd/MM/yyyy' }} </span>
          <ul>
            @if (feed.type) {
            <li>
              <img src="assets/icons/check.svg" alt="ícone de check" />
              {{ feed.type }}
            </li>
            } @if (feed.wifi) {
            <li>
              <img src="assets/icons/check.svg" alt="ícone de check" /> Wi-fi
              grátis
            </li>
            } @if (feed.parking) {
            <li>
              <img src="assets/icons/check.svg" alt="ícone de check" />
              Estacionamento
            </li>
            }
          </ul>
          <div class="divSocial">
            @if (feed.phone || feed.instagram) { @if (feed.phone &&
            feed.phone.trim() !== '') {
            <button>
              <a href="{{ feed.phone }}"
                ><img
                  class="iconBtn"
                  src="assets/icons/whatsapp.svg"
                  alt="ícone do whatsapp"
              /></a>
            </button>
            } @if (feed.instagram && feed.instagram.trim() !== '') {
            <button>
              <a href="{{ feed.instagram }}"
                ><img
                  class="iconBtn"
                  src="assets/icons/instagram.svg"
                  alt="icone do instagram"
              /></a>
            </button>
            } }
            <button class="customBtn btnAct" (click)="goToDetails(feed)">
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
  </section>`,
  styleUrl: './establishments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EstablishmentsComponent {
  feeds: IFeeding[] = [];
  page: number = 1;
  isSubmitFeeds: boolean = false;

  @ViewChild('attFeeds') submitButton!: ElementRef<HTMLButtonElement>;

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
    const storedFeeds = this.storage.getPost('feed') as IFeeding[];
    if (Array.isArray(storedFeeds)) {
      this.feeds = storedFeeds;
    } else {
      this.feeds = [];
    }
  }

  passFeeds() {
    this.page++;
    this.getfeedings();
  }

  prevFeeds() {
    if (this.page - 1 === 0) this.page = 1;
    else this.page--;

    this.getfeedings();
  }

  async getfeedings() {
    this.isSubmitFeeds = true;
    this.submitButton.nativeElement.style.cursor = 'wait';
    this.posts.getAllFeedings(this.page).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.feeds = response;
          this.storage.setPost('feed', this.feeds);
        } else {
          this.feeds = [];
        }
      },
      error: (error) => {
        console.error('Get feedings failed', error);
      },
      complete: () => {
        this.isSubmitFeeds = false;
        this.submitButton.nativeElement.style.cursor = 'pointer';
        this.cdr.markForCheck();
      },
    });
  }

  goToDetails(feed: IFeeding) {
    this.router.navigate(['/detalhes'], {
      queryParams: {
        feed: JSON.stringify(feed),
      },
    });
  }
}
