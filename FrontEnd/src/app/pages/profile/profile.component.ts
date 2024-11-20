import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { StorageService } from '../../services/storage.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { IHosting } from '../../interfaces/posts/hosting.';
import { IFeeding } from '../../interfaces/posts/feeding.';
import { IEvent } from '../../interfaces/posts/event.';
import { AddPostComponent } from './add-post/add-post.component';
import { ImageComponent } from './image/image.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavComponent, ImageComponent, AddPostComponent],
  template: `
    <header>
      <app-nav></app-nav>
    </header>
    <main>
      <section>
        <h1>
          Bem vindo, <span class="h1Header">{{ getName() }}</span
          >!
        </h1>
        <p>Aqui você pode verificar seus posts</p>

        <h2>Posts</h2>
        <article id="artBig">
          <article class="artPosts">
            <h3>Hospedagem</h3>
            <p>Posts encontrados: {{ hostList.length }}</p>
            <div class="divPage">
              <app-add-post postType="hosting"></app-add-post>

              <button
                class="customBtn btnAct btn-post-add-page"
                (click)="prevHost()"
              >
                <
              </button>
              <span class="pageNumber">{{ pageHost }}</span>
              <button
                class="customBtn btnAct btn-post-add-page"
                (click)="passHost()"
              >
                >
              </button>
            </div>

            <ul>
              <li *ngFor="let item of hostList; let i = index">
                <h4>Título: {{ item.title }}</h4>
                <div class="divBtn">
                  <button
                    class="iconBtn"
                    id="deleteBtn{{ item.id }}"
                    (click)="deleteHost(item.id!)"
                  >
                    <img src="assets/icons/delete.svg" alt="ícone de excluir" />
                  </button>
                  <app-image [id]="item.id!" category="hosp"></app-image>
                </div>
              </li>
            </ul>
          </article>
          <article class="artPosts">
            <h3>Alimentação</h3>
            <p>Posts encontrados: {{ feedList.length }}</p>
            <div class="divPage">
              <app-add-post postType="feeding"></app-add-post>

              <button
                class="customBtn btnAct btn-post-add-page"
                (click)="prevFood()"
              >
                <
              </button>
              <span class="pageNumber">{{ pageFeed }}</span>

              <button
                class="customBtn btnAct btn-post-add-page"
                (click)="passFeed()"
              >
                >
              </button>
            </div>

            <ul>
              <li *ngFor="let item of feedList; let i = index">
                <h4>Título: {{ item.title }}</h4>
                <div class="divBtn">
                  <button
                    class="iconBtn"
                    id="deleteBtn{{ item.id }}"
                    (click)="deleteFeeding(item.id!)"
                  >
                    <img src="assets/icons/delete.svg" alt="ícone de excluir" />
                  </button>
                  <app-image [id]="item.id!" category="food"></app-image>
                </div>
              </li>
            </ul>
          </article>
          <article class="artPosts">
            <h3>Eventos</h3>
            <p>Posts encontrados: {{ eventList.length }}</p>
            <div class="divPage">
              <app-add-post postType="event"></app-add-post>

              <button
                class="customBtn btnAct btn-post-add-page"
                (click)="prevEvent()"
              >
                <
              </button>
              <span class="pageNumber">{{ pageEvent }}</span>

              <button
                class="customBtn btnAct btn-post-add-page"
                (click)="passEvent()"
              >
                >
              </button>
            </div>
            <ul>
              <li *ngFor="let item of eventList; let i = index">
                <h4>Título: {{ item.title }}</h4>
                <div class="divBtn">
                  <button
                    class="iconBtn"
                    id="deleteBtn{{ item.id }}"
                    (click)="deleteEvent(item.id!)"
                  >
                    <img src="assets/icons/delete.svg" alt="ícone de excluir" />
                  </button>
                  <app-image [id]="item.id!" category="event"></app-image>
                </div>
              </li>
            </ul>
          </article>
        </article>
      </section>
    </main>
  `,
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  hostList: IHosting[] = [];
  feedList: IFeeding[] = [];
  eventList: IEvent[] = [];

  constructor(
    private readonly postService: PostService,
    private readonly storage: StorageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}
  pageHost: number = 1;
  pageFeed: number = 1;
  pageEvent: number = 1;

  ngOnInit(): void {
    this.getHostings();
    this.getFeeding();
    this.getEvents();
  }

  getName() {
    return this.storage.getItem('name');
  }

  passHost() {
    this.pageHost++;
    this.getHostings();
  }

  prevHost() {
    this.pageHost - 1 === 0 ? (this.pageHost = 1) : this.pageHost--;
    this.getHostings();
  }

  passFeed() {
    this.pageFeed++;
    this.getFeeding();
  }

  prevFood() {
    this.pageFeed - 1 === 0 ? (this.pageFeed = 1) : this.pageFeed--;
    this.getFeeding();
  }

  passEvent() {
    this.pageEvent++;
    this.getEvents();
  }

  prevEvent() {
    this.pageEvent - 1 === 0 ? (this.pageEvent = 1) : this.pageEvent--;
    this.getEvents();
  }

  getHostings() {
    this.postService.getHostings(this.pageHost).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.hostList = response;
          this.cdr.markForCheck();
        } else if (response === 'sem token') {
          this.router.navigate(['/login']);
        } else {
          this.hostList = [];
        }
      },
      error: (error) => {
        console.error('Get hostings failed', error);
        this.router.navigate(['/login']);
      },
    });
  }

  getFeeding() {
    this.postService.getFeeding(this.pageFeed).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.feedList = response;
          this.cdr.markForCheck();
        } else if (response === 'sem token') {
          this.router.navigate(['/login']);
        } else {
          this.feedList = [];
        }
      },
      error: (error) => {
        console.error('Get feeding failed', error);
        this.router.navigate(['/login']);
      },
    });
  }

  getEvents() {
    this.postService.getEvents(this.pageEvent).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.eventList = response;
          this.cdr.markForCheck();
        } else if (response === 'sem token') {
          this.router.navigate(['/login']);
        } else {
          this.eventList = [];
        }
      },
      error: (error) => {
        console.error('Get events failed', error);
        this.router.navigate(['/login']);
      },
    });
  }

  btn(id: string, active: boolean) {
    const button = document.getElementById(id)!;
    if (active) {
      button.style.cursor = 'wait';
      (button as HTMLButtonElement).disabled = true;
    } else {
      button.style.cursor = 'cursor';
      (button as HTMLButtonElement).disabled = false;
    }
  }

  deleteHost(id: string) {
    this.btn('deleteBtn' + id, true);
    this.postService.deleteHostPost(id).subscribe({
      next: () => {
        this.hostList = this.hostList.filter((item) => item.id !== id);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Delete hosting failed', error);
      },
      complete: () => {
        this.btn('deleteBtn' + id, false);
      },
    });
  }

  deleteFeeding(id: string) {
    this.btn('deleteBtn' + id, true);
    this.postService.deleteFeedingPost(id).subscribe({
      next: () => {
        this.feedList = this.feedList.filter((item) => item.id !== id);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Delete feeding failed', error);
      },
      complete: () => {
        this.btn('deleteBtn' + id, false);
      },
    });
  }

  deleteEvent(id: string) {
    this.btn('deleteBtn' + id, true);
    this.postService.deleteEventPost(id).subscribe({
      next: () => {
        this.eventList = this.eventList.filter((item) => item.id !== id);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Delete event failed', error);
      },
      complete: () => {
        this.btn('deleteBtn' + id, false);
      },
    });
  }
}