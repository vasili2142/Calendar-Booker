import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MonthLoopComponent } from './components/month-loop/month-loop.component';
import { MonthLoopWrapperComponent } from './components/month-loop-wrapper/month-loop-wrapper.component';
import { LoggerComponent } from './components/logger/logger.component';

import { LoggerService } from './services/logger.service';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [
    AppComponent,
    MonthLoopComponent,
    MonthLoopWrapperComponent,
    LoggerComponent,
  ],
  bootstrap: [AppComponent],
  providers: [LoggerService],
})
export class AppModule {}
