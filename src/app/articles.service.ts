import { AngularFireDatabase, FirebaseListObservable , FirebaseObjectObservable  } from 'angularfire2/database';
import { FirebaseApp ,  } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { ArticleListComponent } from './article-list/article-list.component';

@Injectable()
export class ArticlesService {

  private articles: FirebaseListObservable<any[]>;
  private article: FirebaseObjectObservable<any>;


  constructor(private af: AngularFireDatabase) {}

  getArticles(){
    this.articles = this.af.list('/articles', { query: {orderByChild: 'article-1', }}).map( (arr) => { return arr.reverse() } ) as FirebaseListObservable<any[]>;
    return this.articles;
  }


  getArticle( articID: any) {
/*    this.article = this.af.object('/articles/' + id);
    return  this.article.subscribe( article => {return article ;});*/
  return this.getArticles().map( data => { return data;}).concatMap( arr => Observable.from(arr)).filter( (ArtItem: any) =>  ArtItem.id === articID  )}


}
