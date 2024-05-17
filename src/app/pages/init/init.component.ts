import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent implements OnInit{
  private _apiService = inject(ApiService);
  private _router = inject(Router);
  ngOnInit(): void {
    this._apiService.getQuestions().subscribe((data)=>{
      console.log(data)
    })
  }
}
