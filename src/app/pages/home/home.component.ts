import { Component, ContentChildren, inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ICategories } from '../../models/categories.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CardQuestionComponent } from '../../components/card-question/card-question.component';
import { IQuestion } from '../../models/question.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../components/modal/modal.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, NgClass, CardQuestionComponent,ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild(ModalComponent) modal?: ModalComponent;
  initForm!: FormGroup
  private _apiService = inject(ApiService);
  categories: ICategories[] = [];
  question!: IQuestion
  constructor(private formBuilder: FormBuilder, private ngZone: NgZone, private router: Router, private http:HttpClient){
    this.initForm = this.formBuilder.group({
      levelQuestions: ['',[Validators.required]],
      typeQuestions: ['',[Validators.required]],
      categoryQuestions: ['',[Validators.required]],
    })
  }
  ngOnInit(): void {    
    this._apiService.getCategories().subscribe(res=> {
      this.categories = res.trivia_categories.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          color: `rgb(${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)})`,
          icon:item.name.toLowerCase().replace(/\s/g, '').replace(":","")
        }
      })
    })
    this._apiService.getQuestions(9,1,'easy','multiple').subscribe(data=>{
      this.question = data.results[0]
    })
  }
  getRandomNumber(min:number, max:number) {
    return Math.random() * (max - min) + min
  }
  hasErrors(controlName: string,errorType: string){
    return this.initForm.get(controlName)?.hasError(errorType) && this.initForm.get(controlName)?.touched
  }
  onSubmit(event: Event){
    event.preventDefault();  
    if(!this.initForm.valid){
      this.modal?.open("Error","You need to select level, type and category of questions");
    }else{
      this.router.navigate(['/category',this.initForm.value.categoryQuestions],{queryParams:{type:this.initForm.value.typeQuestions,level:this.initForm.value.levelQuestions}});
    }
  }
  
}
