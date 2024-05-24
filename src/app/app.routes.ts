import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [    
    { path: '', component: HomeComponent },
    { path: 'category/:id', component: CategoryComponent },
];