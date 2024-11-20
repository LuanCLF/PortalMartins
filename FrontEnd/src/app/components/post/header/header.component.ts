import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent],
  template: `    
  <header>
  <app-nav></app-nav>
  <section>

    <article id="art1">
    <figure>
          <img
          class="img headerImg" [src]="image" [alt]="imgAlt"
          />
        </figure>
      <div>
        <h1 class="h1Header">{{titlePart1}} <br/> {{titlePart2}}</h1>
        <p>
          {{subtext}}
        </p>
      </div>
    </article>
    <article id="art2">
      <ul>
        <li>
          <span> 01 </span>
          <div>
            <h3>{{c1Title}}</h3>
            <p>{{c1Text}}</p>
          </div>
        </li>
        <li>
          <span> 02 </span>
          <div>
            <h3>{{c2Title}}</h3>
            <p>{{c2Text}}</p>
          </div>
        </li>
        <li>
          <span> 03 </span>
          <div>
            <h3>{{c3Title}}</h3>
            <p>
              {{c3Text}}
            </p>
          </div>
        </li>
      </ul>
    </article>
  </section>
</header>`,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() titlePart1: string = '';
  @Input() titlePart2: string = '';
  @Input() subtext: string = '';
  @Input() image: string = '';
  @Input() c1Title: string = '';
  @Input() c1Text: string = '';
  @Input() c2Title: string = '';
  @Input() c2Text: string = '';
  @Input() c3Title: string = '';
  @Input() c3Text: string = '';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = '';
 }
