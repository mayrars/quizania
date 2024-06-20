import { Component, ComponentRef, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { CardQuestionComponent } from '../../components/card-question/card-question.component';
import { Difficulty, IQuestion } from '../../models/question.model';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [StepperComponent, CardQuestionComponent, ModalComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  @ViewChild(ModalComponent) modal?: ModalComponent;
  private _apiService = inject(ApiService);
  private _route = inject(ActivatedRoute)
  modalData!:ComponentRef<ModalComponent>
  category!: number;
  typeQuestions!: string | null;
  levelQuestions!: string | null;
  currentQuestion: number = 0;
  questions: any[] = [];
  numberOfQuestions: number = 0;
  answersInfo:any[] =[];
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
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&quot;/g, "\"");
    str = str.replace(/&apos;/g, "'");
    str = str.replace(/&#039;/g, "'");
    return str;
  }
  //Go to next question
  nextQuestion(){
    if(this.answersInfo[this.currentQuestion]==='' || this.answersInfo[this.currentQuestion]===null || (typeof this.answersInfo[this.currentQuestion]==='undefined')){
      this.modal?.open("Error","Please respond and validate your answer");
    }else{
      if(this.currentQuestion < this.numberOfQuestions-1){
        this.currentQuestion++;
      }
    }
  }
  //Go to previous question
  previousQuestion(){
    if(this.answersInfo[this.currentQuestion]==='' || this.answersInfo[this.currentQuestion]===null || (typeof this.answersInfo[this.currentQuestion]==='undefined')){
      this.modal?.open("Error","Please respond and validate your answer");
    }else{
      if(this.currentQuestion > 0){
        this.currentQuestion--;
      }
    }
  }
  addAnswer(answer:any){
    if(answer===null)
      this.modal?.open("Error","You need to answer the question");
    else{
      this.answersInfo.push(answer);
      if(answer==false)
        this.modal?.open("Error","Wrong answer");
      else
        this.modal?.open("Correct","Correct answer");
    }    
  }
  resultsQuestion(){
    //validate if all questions have been answered
    if(this.answersInfo.length!==this.numberOfQuestions){
      this.modal?.open("Error","Please respond and validate all your answers");
    }else{
      //Return number of correct answers
      let correctAnswers:number = 0;
      let incorrectAnswers:number = 0;
      for(let i=0;i<this.answersInfo.length;i++){
        if(this.answersInfo[i]===true){
          correctAnswers++;
        }
        incorrectAnswers++
      }
      //show alert with correct ans
      this.modal?.open("Correct answer",'You have '+correctAnswers+' correct answers');
    }
  }
}
