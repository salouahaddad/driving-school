import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { luhnValidator } from './validators/luhn-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { filter ,map,tap,switchMap} from "rxjs/operators";
import { CanditateService } from 'src/app/shared/services/canditate.service';
import { ExamService } from 'src/app/shared/services/exam.service';
@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.scss']
})
export class PayerComponent implements OnInit{

  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute
    ,private canditateService :CanditateService,private examService :ExamService) {
   
  }

  ngOnInit(): void {

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/),luhnValidator]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  makePayment() {
    if (this.paymentForm.valid) {
      
        this.route.params.pipe(
        map(params => {
          this.canditateService.getCanditateByNum(+localStorage["num_conditate"]).pipe(
            map(c=>{
              c.num_exam=parseInt(params['numExm']);
              this.canditateService.saveCanditate(c);
            }
          )).subscribe();
          this.examService.getExamByNum(+params['numExm']).pipe(
            map(e=>{
              e.number_libr--;
              this.examService.saveExam(e);
            })
          ).subscribe()
        })
          
    ).subscribe();
      alert("Paiement effectué avec succès");
      this.router.navigateByUrl("/espace-candidat");
    } else {
      
      alert("Données de formulaire invalides. Veuillez vérifier les champs.");
      
    }
  }
  annule(){
    this.router.navigateByUrl("/espace-candidat");
  }
  
}
