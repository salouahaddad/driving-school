import { Component,OnInit ,Input} from '@angular/core';
import { Canditate } from 'src/app/shared/models/canditate.model';
import { Exam } from 'src/app/shared/models/exam.model';
import { Observable } from 'rxjs';
import { filter ,map,tap} from "rxjs/operators";
import { CanditateService } from 'src/app/shared/services/canditate.service';
import { ExamService } from 'src/app/shared/services/exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-exam',
  templateUrl: './modifier-exam.component.html',
  styleUrls: ['./modifier-exam.component.scss']
})
export class ModifierExamComponent implements OnInit {

  @Input() candidate!: Canditate;


  listeExam$!:Observable<Exam[]>;
  examen!:Exam;

  constructor(private canditateService :CanditateService,private examService :ExamService,
    private router: Router){

  }


  ngOnInit(): void {
    this.listeExam$=this.examService.getAllExam();
    
    this.canditateService.getCanditateByNum(parseInt(localStorage["num_conditate"])).pipe(
    map(x=>{

      this.candidate=x;
      this.examService.getExamByNum(this.candidate.num_exam).pipe(
        map(e=>this.examen=e)
      ).subscribe();
    })
   ).subscribe();

   
  
  }



  save(){
    this.examen.number_libr++;
    this.examService.saveExam(this.examen).subscribe();
    this.examService.getExamByNum(this.candidate.num_exam).pipe(
      map(e=>{
        e.number_libr--;
        this.examService.saveExam(e).subscribe();
      })
    ).subscribe();
     this.canditateService.saveCanditate(this.candidate);
     this.router.navigateByUrl("/espace-candidat");
  }

  annule(){
    this.router.navigateByUrl("/espace-candidat");
  }
}
