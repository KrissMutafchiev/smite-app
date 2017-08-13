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
export class ArticleDetailComponent implements OnInit  {

  private  articleID: any;
  public   detailArticle: any ;
  public errorMessage :string = 'Error !!';


  constructor( private route: ActivatedRoute , private _articlesService: ArticlesService ) {
  }

  ngOnInit () {
     this.route.params.subscribe( (params) => {
      this.articleID = params['id'];
       this.route.params
         .do(params => this.articleID = params['id'])
         .switchMap(
           params => this._articlesService.getArticle(this.articleID)
         )
         .subscribe( article => this.detailArticle = article );     }
    );

  }

}
