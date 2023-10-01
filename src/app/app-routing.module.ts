import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './accueil/components/home/home.component';
import { ContactComponent } from './accueil/components/contact/contact.component';
import { ServicesComponent } from './accueil/components/services/services.component';
import { LoginComponent } from './accueil/components/login/login.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'contact', component: ContactComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'espace-candidat', loadChildren : ()=>import('./espace-candidat/espace-candidat.module').then(m => m.EspaceCandidatModule)},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
