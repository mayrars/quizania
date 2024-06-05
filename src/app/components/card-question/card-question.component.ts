import { Component, Input } from '@angular/core';
import { IQuestion } from '../../models/question.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-question',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-question.component.html',
  styleUrl: './card-question.component.css'
})
export class CardQuestionComponent{
  @Input() hidden!: number;
  @Input() question!: IQuestion;
  elements!: number
  rand = this.getRandomInt(0,3)
  questionResAnswer = ''
  questionsForm!:FormGroup

  constructor(private formBuilder: FormBuilder) { 
    this.questionsForm = this.formBuilder.group({
      answer: ['', Validators.required],
    })
  }

  getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  hasErrors(controlName: string,errorType: string){
    return this.questionsForm.get(controlName)?.hasError(errorType) && this.questionsForm.get(controlName)?.touched
  }
  //Validate answer
  submitAnswer(event:Event) {
    event.preventDefault();
    if(!this.questionsForm.valid) {
      alert("Por favor seleccione una respuesta")
    }else{
      if (this.questionsForm.value.answer == this.question.correct_answer) {
        this.questionResAnswer = 'Correct answer'
      } else {
        this.questionResAnswer = 'Wrong answer'
      }
      alert(this.questionResAnswer)
    }
  }
}