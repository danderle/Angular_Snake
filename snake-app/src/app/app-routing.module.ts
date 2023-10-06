import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HighScoresComponent } from './components/high-scores/high-scores.component';
import { PlayComponent } from './components/play/play.component';

const routes: Routes = [
  {path: '', component: MainMenuComponent},
  {path: 'highScores', component: HighScoresComponent},
  {path: 'play', component: PlayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
