import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter ,map,switchMap} from "rxjs/operators";
import { Exam } from "../models/exam.model";

@Injectable({
	providedIn: "root"
})
export class ExamService {

	constructor(private http: HttpClient) {
	}

    getAllExam():Observable<Exam[]>{
        return this.http.get<Exam[]>("/assets/data/exam.json");
    }

    getExamByNum(num:number):Observable<Exam>{
        return this.http.get<Exam[]>("/assets/data/exam.json").pipe(
            map(x=>x.filter(c=>c.num_exam===num)[0])
            );
    }

    saveExam(exam:Exam):Observable<Exam>{
        return this.getExamByNum(exam.num_exam).pipe(
            map(examn => ({
                ...examn,
                number_libr: exam.number_libr
            })),
            switchMap(updatedExam => this.http.put<Exam>(
                `/assets/data/exam.json/${exam.num_exam}`,
                updatedExam)
            )
        );
    }


}