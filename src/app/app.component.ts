import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserAuthentication } from './components/user-authentication.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private counter = 1;

  articles: FirebaseListObservable<any[]>;

  constructor( private db: AngularFireDatabase ) {
    this.articles = db.list('/articles', {
      query: {
        orderByChild: 'article-1',
      }
    });

  }

  public counterUp() {
    console.log(this.counter);
    return this.counter += this.counter;
  }

}
