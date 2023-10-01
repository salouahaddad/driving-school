import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import{map,startWith,tap} from 'rxjs/operators'
import { CanditateService } from 'src/app/shared/services/canditate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  emailCtrl!: FormControl;
  passwordCtrl!: FormControl;
  loading = false;
  loginInfoForm!: FormGroup;
  isErrour=false;

  showPasswordError$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,private canditateService :CanditateService,
    private router: Router){

  }

  ngOnInit(): void {
    if(!!localStorage["num_conditate"]){
      this.router.navigateByUrl("/espace-candidat");
    }else{

      this.emailCtrl = this.formBuilder.control('', [Validators.required,Validators.email]);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);

    this.loginInfoForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,

  });


    }
    
  }
  Login(){

    this.canditateService.login(this.emailCtrl.value,this.passwordCtrl.value).pipe(
      tap(x=>{
        if(!!x){
          localStorage["num_conditate"]=x.num_conditate;
          
          this.router.navigateByUrl("/espace-candidat")
        }
       else{
        this.isErrour=true;
       }
      }
        
      )).subscribe();
   
  }
}
