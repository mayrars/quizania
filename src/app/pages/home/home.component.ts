import { afterNextRender, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ICategories } from '../../models/categories.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _apiService = inject(ApiService);
  categories: ICategories[] = [];
  colors: string[] = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'esmerald', 'sky', 'indigo'];
  range: string[] =["200", "300", "400", "500", "600", "700", "800", "900"];
 
  ngOnInit(): void {    
    this._apiService.getCategories().subscribe(res=> {
      this.categories = res.trivia_categories.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          color: `bg-${this.colors[item.id % this.colors.length]}-${this.range[item.id % this.range.length]}`,
          icon:item.name.toLowerCase().replace(/\s/g, '').replace(":","")
        }
      })
    })
  }
}
