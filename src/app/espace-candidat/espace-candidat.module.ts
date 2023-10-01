import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspaceCandidatRoutingModule } from './espace-candidat-routing.module';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ModifierExamComponent } from './components/modifier-exam/modifier-exam.component';
import { PayerComponent } from './components/payer/payer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccueilComponent,
    ModifierExamComponent,
    PayerComponent,
  ],
  imports: [
    CommonModule,
    EspaceCandidatRoutingModule,
    CoreModule,
    FormsModule,
    SharedModule,
  ]
})
export class EspaceCandidatModule { }
