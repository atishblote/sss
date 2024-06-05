import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegularJodiComponent } from './pages/regular-jodi/regular-jodi.component';

export const routes: Routes = [
    {path: '', title:"Prabhat Satta Matka | Prabhat Matka Results | Prabhat Night", component: HomeComponent},
    {path: 'jodi/:id',title:"Jodi Prabhat Satta Matka | Jodi Prabhat Matka Results | Jodi Prabhat Night",  component: RegularJodiComponent}
];
