import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { ArticlesService } from '../articles.service';
import {Observable} from "rxjs/Observable";



@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit , OnDestroy {

  private subscription: Subscription;
  public article;
  constructor(private af: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private articlesService: ArticlesService)  {

  }


  ngOnInit() {
    let key: string;
    this.route.params.take(1).subscribe(param => key = param[" id "]);
    this.subscription = this.articlesService.getArticles().subscribe( article => (console.log(article), this.article = article));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
