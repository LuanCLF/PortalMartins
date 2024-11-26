import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IHosting } from '../../../../interfaces/posts/hosting.';
import { PostService } from '../../../../services/post.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-hostings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="sec1">
      <h2>Junte-se a nossa comunidade</h2>
      <p>
        <button class="customBtn">
          <a link="/cadastro" target="_blank">Cadastre-se</a>
        </button>
        para criar posts aqui
      </p>
      <div id="pagesBtn">
        <button
          class="customBtn btnAct"
          #attHosts
          [disabled]="isSubmitHosts"
          (click)="getHostings()"
        >
          Atualizar
        </button>
        <button class="customBtn btnAct" (click)="prevHosts()"><</button>
        <span>{{ page }}</span>
        <button class="customBtn btnAct" (click)="passHosts()">></button>
      </div>
      @if(hosts.length > 0) {
      <ul [class]="hosts.length > 1 ? 'ulList uln' : 'ulList ul1'">
        @for (host of hosts; track $index) {
        <li class="liBig">
          @if (host.images.length > 0) {
          <img class="img" src="{{ host.images[0] }}" alt="Imagem de pousada" />
          } @else {
          <img class="img" src="assets/images/noImage.jpeg" alt="Sem imagem" />
          }
          <div class="dContent">
            <h3>{{ host.title }}</h3>
            <span> Postado em {{ host.createdAt | date : 'dd/MM/yyyy' }} </span>
            <ul>
              @if (host.bedrooms > 0) {
              <li>
                <img
                  class="icons"
                  src="assets/icons/bed.svg"
                  alt="ícone de cama"
                />
                {{ host.bedrooms }} quarto(s)
              </li>
              } @if (host.bathroom > 0) {
              <li>
                <img
                  class="icons"
                  src="assets/icons/shower.svg"
                  alt="ícone de chuveiro"
                />
                {{ host.bathroom }} banheiro(s)
              </li>
              } @if (host.vacancy > 0) {
              <li>
                <img
                  class="icons"
                  src="assets/icons/car.svg"
                  alt="ícone de carro"
                />
                {{ host.vacancy }} vaga(s)
              </li>
              } @if (host.serviceArea) {
              <li>
                Área de Serviço
                <img
                  class="icons"
                  src="assets/icons/check.svg"
                  alt="ícone de check"
                />
              </li>
              } @if (host.kitchen) {
              <li>
                Cozinha
                <img
                  class="icons"
                  src="assets/icons/check.svg"
                  alt="ícone de check"
                />
              </li>
              } @if (host.garden) {
              <li>
                Jardim
                <img
                  class="icons"
                  src="assets/icons/check.svg"
                  alt="ícone de check"
                />
              </li>
              }
            </ul>
            <div class="divSocial">
              @if (host.phone || host.instagram) { @if (host.phone &&
              host.phone.trim() !== '') {
              <button>
                <a href="{{ host.phone }}"
                  ><img
                    class="iconBtn"
                    src="assets/icons/whatsapp.svg"
                    alt="ícone do whatsapp"
                /></a>
              </button>
              } @if (host.instagram && host.instagram.trim() !== '') {
              <button>
                <a href="{{ host.instagram }}"
                  ><img
                    class="iconBtn"
                    src="assets/icons/instagram.svg"
                    alt="icone do instagram"
                /></a>
              </button>
              } }
              <button class="customBtn btnAct" (click)="goToDetails(host)">
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
  `,
  styleUrl: './hostings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostingsComponent implements OnInit {
  hosts: IHosting[] = [];
  page: number = 1;
  isSubmitHosts: boolean = false;

  @ViewChild('attHosts') submitButton!: ElementRef<HTMLButtonElement>;

  constructor(
    private readonly posts: PostService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly storage: StorageService
  ) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const storedHosts = this.storage.getPost('host') as IHosting[];

    if (Array.isArray(storedHosts)) {
      this.hosts = storedHosts;
    } else {
      this.hosts = [];
    }
  }

  passHosts() {
    this.page++;
    this.getHostings();
  }

  prevHosts() {
    if (this.page - 1 === 0) this.page = 1;
    else this.page--;

    this.getHostings();
  }

  getHostings() {
    this.isSubmitHosts = true;
    this.submitButton.nativeElement.style.cursor = 'wait';
    this.posts.getAllPosts(  'hosting',this.page).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.hosts = response as IHosting[];
          this.storage.setPost('host', this.hosts);
        } else {
          this.hosts = [];
        }
      },
      error: (error) => {
        console.error('Get hostings failed', error);
      },
      complete: () => {
        this.isSubmitHosts = false;
        this.submitButton.nativeElement.style.cursor = 'pointer';
        this.cdr.markForCheck();
      },
    });
  }

  goToDetails(host: IHosting) {
    this.router.navigate(['/detalhes'], {
      queryParams: {
        host: JSON.stringify(host),
      },
    });
  }
}
