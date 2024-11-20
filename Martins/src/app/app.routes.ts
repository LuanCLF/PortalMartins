import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HostingComponent } from './pages/posts/hosting/hosting.component';
import { FeedingComponent } from './pages/posts/feeding/feeding.component';
import { EventComponent } from './pages/posts/event/event.component';
import { CreateComponent } from './pages/create/create.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailsComponent } from './components/post/details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: CreateComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'perfil', component: ProfileComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'hospedagem', component: HostingComponent },
  { path: 'alimentacao', component: FeedingComponent },
  { path: 'eventos', component: EventComponent },
  { path: 'detalhes', component: DetailsComponent },
  { path: '**', redirectTo: '/' },
];
