import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Canditate } from "./../models/canditate.model";
import { filter ,map,switchMap} from "rxjs/operators";
@Injectable({
	providedIn: "root"
})
export class CanditateService {

	constructor(private http: HttpClient) {
	}

    login(email:string,password:string):Observable<Canditate>{
       return this.http.get<Canditate[]>("/assets/data/canditate.json").pipe(
            map(x=>x.filter(c=>c.email===email && c.password===password)[0])
            );
    }

    getCanditateByNum(num:number):Observable<Canditate>{
        return this.http.get<Canditate[]>("/assets/data/canditate.json").pipe(
            map(x=>x.filter(c=>c.num_conditate===num)[0])
            );
    }

    saveCanditate(canditate:Canditate):Observable<Canditate>{
        return this.getCanditateByNum(canditate.num_conditate).pipe(
            map(canditat => ({
                ...canditat,
                num_exam: canditate.num_exam
            })),
            switchMap(updatedCanditat => this.http.put<Canditate>(
                `/assets/data/canditate.json/${canditate.num_exam}`,
                updatedCanditat)
            )
        );
    }


}