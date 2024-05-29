import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ICategories } from '../../models/categories.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  initForm!: FormGroup
  private _apiService = inject(ApiService);
  categories: ICategories[] = [];
  constructor(private formBuilder: FormBuilder){
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
  }
  getRandomNumber(min:number, max:number) {
    return Math.random() * (max - min) + min
  }
  hasErrors(controlName: string,errorType: string){
    return this.initForm.get(controlName)?.hasError(errorType) && this.initForm.get(controlName)?.touched
  }
  onSubmit(event: Event){
    event.preventDefault();
    if(!this.initForm.valid)
      alert("You need to select level, type and category of questions")
    else{
      this._apiService.getQuestions(9,1).subscribe(data=>{
        console.log(data)
      })
    }
  }
}
