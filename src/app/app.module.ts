import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/components/dashboard/dashboard.module';
import { StudentsModule } from './modules/components/navmenu/students/students.module';
import { CoursesModule } from './modules/components/navmenu/courses/courses.module';
import { AuthModule } from './modules/components/auth/auth.module';
import { LoginModule } from './modules/components/auth/login/login.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { inscriptionHistoryReducer } from './modules/store/inscriptions.reducer';
import { InscriptionHistoryEffects } from './modules/store/inscriptions.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    StudentsModule,
    CoursesModule,
    AuthModule,
    LoginModule,
    StoreModule.forRoot({ inscriptionHistory: inscriptionHistoryReducer }),
    EffectsModule.forRoot([InscriptionHistoryEffects])
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }