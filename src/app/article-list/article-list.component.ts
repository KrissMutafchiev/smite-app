import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { ArticlesService } from '../articles.service';
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';




@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit , OnDestroy {


  articles = new BehaviorSubject([]);
  subscription: Subscription;

   batch = 5 ;      // size of each query
   lastKey = '';      // key to offset next query from
   finished = false ;  // boolean when end of database is reached

  constructor(
    private af: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
  ) {}




  ngOnInit() {
    this.getArticle();
  }

  onScroll(){
    console.log('scrolled!!');
    this.getArticle();
  }

  private getArticle(key?) {
    let keyy: string;
    this.route.params.take(1).subscribe(param => keyy = param[" id "]);
    if (this.finished) return;

    this.articlesService
      .getArticles(this.batch + 1, this.lastKey)
      .do( article => {
      /// set the lastKey in preparation for next query
      this.lastKey = _.last(article)['$key'];
      const newArticle = _.slice(article, 0, this.batch);

      /// Get current movies in BehaviorSubject
      const currentArticle = this.articles.getValue();

      /// If data is identical, stop making queries
      if (this.lastKey == _.last(newArticle)['$key']) {
        this.finished = true ;
      }
      /// Concatenate new movies to current movies
      this.articles.next( _.concat(currentArticle, newArticle) )
    })
      .take(1)
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
