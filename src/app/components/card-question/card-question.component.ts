import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQuestion } from '../../models/question.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-question',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-question.component.html',
  styleUrl: './card-question.component.css'
})
export class CardQuestionComponent{
  @Input() question!: IQuestion;
  @Output() responseEvent = new EventEmitter<boolean>();
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
        this.responseEvent.emit(true)
      } else {
        this.questionResAnswer = 'Wrong answer'
        this.responseEvent.emit(false)
      }
      this.formBuilder.control('answer').disable()
      alert(this.questionResAnswer)
    }
  }
}