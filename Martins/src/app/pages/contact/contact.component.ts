import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NavComponent],
  template: ` <header>
      <app-nav></app-nav>
    </header>
    <main>
      <section>
        <h1 class="h1Header">Entre em Contato</h1>
        <p>Motivos para se comunicar conosco</p>
        <ul>
          <li class="liInfo">
            <div>
              <img src="/assets/icons/chat.svg" alt="" />
            </div>
            <div class="info">
              <h3>Informações Gerais</h3>
              <p>Para dúvidas gerais sobre o projeto</p>
            </div>
          </li>
          <li class="liInfo">
            <div>
              <img src="/assets/icons/bug.svg" alt="" />
            </div>
            <div class="info">
              <h3>Suporte Técnico</h3>
              <p>Para reportar problemas técnicos ou bugs </p>
            </div>
          </li>
          <li class="liInfo">
            <div>
              <img src="/assets/icons/partner.svg" alt="" />
            </div>
            <div class="info">
              <h3>Parcerias</h3>
              <p>Colabore para o avanço do projeto</p>
            </div>
          </li>
        </ul>
        <h2>Formas de contato</h2>
        <ul>
          <li>
            <button class="customBtn btnAct">
              <a href="https://wa.me/558487166835" target="_blank"
                >Whatsapp
                <img
                  class="icons"
                  src="assets/icons/whatsapp.svg"
                  alt="Ícone do whatsapp"
              /></a>
            </button>
          </li>
          <li>
            <button class="customBtn btnAct">
              <a href="mailto:firminocharlys@gmail.com" target="_blank"
                >Email
                <img
                  class="icons"
                  src="assets/icons/mail.svg"
                  alt="Ícone de e-mail"
              /></a>
            </button>
          </li>
          <li>
            <button class="customBtn btnAct">
              <a
                href="https://www.instagram.com/luan_charlyslf/"
                target="_blank"
                >Instagram
                <img
                  class="icons"
                  src="assets/icons/instagram.svg"
                  alt="Ícone do instagram"
              /></a>
            </button>
          </li>
          <li>
            <button class="customBtn btnAct">
              <a
                >(84) 9 8716-6835
                <img
                  class="icons"
                  src="assets/icons/call.svg"
                  alt="Ícone de telefone"
              /></a>
            </button>
          </li>
        </ul>
      </section>
    </main>`,
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
