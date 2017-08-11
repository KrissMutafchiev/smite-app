import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './../environments/firebase.config';


import { AppComponent } from './app.component';
import { UserAuthentication } from './components/user-authentication.component';
import { BackgroundScenComponent } from './background-scen/background-scen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesService } from './articles.service';

import { Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
  {path: 'articles/:id', component: ArticleDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserAuthentication,
    BackgroundScenComponent,
    NavbarComponent,
    ArticleListComponent,
    ArticleDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)


  ],
  providers: [ArticlesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
