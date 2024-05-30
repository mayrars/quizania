import { Component, Input, OnInit } from '@angular/core';
import { IQuestion } from '../../models/question.model';

@Component({
  selector: 'app-card-question',
  standalone: true,
  imports: [],
  templateUrl: './card-question.component.html',
  styleUrl: './card-question.component.css'
})
export class CardQuestionComponent{
  @Input() question!: IQuestion;
  elements!: number
  rand = this.getRandomInt(0,3)

  constructor() { }

  getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  //Validate answer
  submitAnswer() {
  }
}