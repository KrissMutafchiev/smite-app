import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, RouterModule , ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { ArticlesService } from '../articles.service';
import {AfterViewInit} from '@angular/core';
import {Observable} from "rxjs/Observable";



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements AfterViewInit  {

  private  articleID: any;
  public detailArticle: any ;


  constructor( private route: ActivatedRoute , private _articlesService: ArticlesService ) {
  }

  ngAfterViewInit () {
     this.route.params.subscribe( (params) => {
      this.articleID = params['id'];
      this._articlesService.getArticle(this.articleID).subscribe( article => this.detailArticle = article );
    } );
     console.log(this.detailArticle);
  }

}
