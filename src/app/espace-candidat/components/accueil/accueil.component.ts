import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from 'src/app/shared/services/canditate.service';
import { Observable } from 'rxjs';
import { Canditate } from 'src/app/shared/models/canditate.model';
import { Exam } from 'src/app/shared/models/exam.model';
import { ExamService } from 'src/app/shared/services/exam.service';
import { filter ,map,tap} from "rxjs/operators";


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  candidate$!:Observable<Canditate>;
candidate!:Canditate;
examCanditate$!:Observable<Exam>;
  listeExam$!:Observable<Exam[]>;

  constructor(private formBuilder: FormBuilder,private canditateService :CanditateService,private examService :ExamService,
    private router: Router){

  }

  ngOnInit(): void {

   this.candidate$=this.canditateService.getCanditateByNum(parseInt(localStorage["num_conditate"]));
   this.candidate$.pipe(
    map(x=>{

      this.candidate=x;
      this.examCanditate$=this.examService.getExamByNum(this.candidate.num_exam);
    })
   ).subscribe();

   
   this.listeExam$=this.examService.getAllExam();
  
  
  }

  reservation(exam :Exam){

    this.router.navigateByUrl(`/espace-candidat/payer/${exam.num_exam}`);
 
  }

  modifier(){
    this.router.navigateByUrl("/espace-candidat/modifier");
  }

  deconnecte(){
    localStorage.removeItem("num_conditate");
    this.router.navigateByUrl("/home");
  }
}
