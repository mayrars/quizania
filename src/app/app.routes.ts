import { Routes } from '@angular/router';
import { InitComponent } from './pages/init/init.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [    
    { path: '', component: HomeComponent },
    { path: 'init', component: InitComponent },
];
