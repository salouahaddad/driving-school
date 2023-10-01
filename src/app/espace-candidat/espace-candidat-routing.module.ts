import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ModifierExamComponent } from './components/modifier-exam/modifier-exam.component';
import { PayerComponent } from './components/payer/payer.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'modifier', component: ModifierExamComponent },
  { path: 'payer/:numExm', component: PayerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceCandidatRoutingModule { }
