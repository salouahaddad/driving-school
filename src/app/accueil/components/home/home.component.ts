import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private route: ActivatedRoute,
    private router: Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  login(){
    this.router.navigateByUrl("/login");
  }
inscription(){
    this.router.navigateByUrl("/inscription");
  }
}
