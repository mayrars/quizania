import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { CardQuestionComponent } from '../../components/card-question/card-question.component';
import { Difficulty, IQuestion } from '../../models/question.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [StepperComponent, CardQuestionComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  private _apiService = inject(ApiService);
  private _route = inject(ActivatedRoute)
  category!: number;
  typeQuestions!: string | null;
  levelQuestions!: string | null;
  currentQuestion: number = 0;
  questions: any[] = [];
  numberOfQuestions: number = 0;
  constructor(private rutaActiva: ActivatedRoute) { }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.category = params['id'];
      this.levelQuestions = this._route.snapshot.queryParamMap.get('level') || 'easy' 
      this.typeQuestions = this._route.snapshot.queryParamMap.get('type') || 'multiple' 
      this._apiService.getQuestions(this.category,10,this.levelQuestions,this.typeQuestions).subscribe(data=>{
        this.questions = data.results.map((question: IQuestion) => {
          return {
            type: question.type,
            difficulty: question.difficulty,
            category: question.category,
            question: this.convert(question.question),
            correct_answer: this.convert(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer: any) => this.convert(answer)),
          }
        })
        this.numberOfQuestions = data.results.length;
      })
    })
  }
  convert(str: string) {
    str = str.replace(/&amp;/g, "&");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&lt;</g, "<");
    str = str.replace(/&quot;/g, "\"");
    str = str.replace(/&apos;'/g, "'");
    return str;
  }
  //Go to next question
  nextQuestion(){
    if(this.currentQuestion < this.numberOfQuestions-1){
      this.currentQuestion++;

    }
    console.log(this.currentQuestion)
  }
  //Go to previous question
  previousQuestion(){
    if(this.currentQuestion > 0){
      this.currentQuestion--;
    }
    console.log(this.currentQuestion)
  }
}
