import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { HighScoreModel } from 'src/app/models/high-score-model';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})

export class HighScoresComponent implements OnInit, AfterViewInit{

  public name: string = '';
  public score: number = 0;
  public topScores: HighScoreModel[];
  @ViewChild('inputName')
  public inputName: ElementRef;

  private baseUrl = "https://localhost:7078/topScores"
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient){}
  ngAfterViewInit(): void {
    if(this.inputName){
      this.inputName.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.score = +params['score'];
    });

    //todo load top scores from backend
    this.http.get<HighScoreModel[]>(this.baseUrl).subscribe(response => {
      this.topScores = response;
      this.addNewHighScore();
    });
  }

  public saveNewTopScore(): void{
    //todo save new topScore in database
    let topScore = this.topScores.find(item => item.newScore);
    if(topScore){
      topScore.name = this.name;
      this.http.post<HighScoreModel>(this.baseUrl, topScore).subscribe();
    }
  }

  public getName(name: string): void{
    this.name = name;
  }

  private addNewHighScore(): void{
    console.log(this.score);
    if(this.score === 0 || Number.isNaN(this.score)){
      return;
    }

    let newTopScore: HighScoreModel = {name: '', score: this.score, newScore: true};
    if(this.topScores.length === 0){
      this.topScores.push(newTopScore);
      return;
    }

    // lets assume that we get the topscores sorted from highest to lowest from the database
    let topScore = this.topScores.at(0) as HighScoreModel;
    let lastScore = this.topScores.at(-1) as HighScoreModel;
    if(this.score > lastScore.score){
      if(this.score > topScore.score){
        this.topScores.splice(0, 0, newTopScore);
      } else {
        let i: number = this.topScores.length - 1;
        for(i; i >= 0; i--){
          if(this.score <= this.topScores[i].score){
            this.topScores.splice(i + 1, 0, newTopScore);
            break;
          }
        }
      }
    } else {
      this.topScores.push(newTopScore);
    }

    while(this.topScores.length > 10){
      this.topScores.splice(10, 1);
    }
  }
}
