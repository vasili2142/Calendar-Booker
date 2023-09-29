import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css'],
})
export class LoggerComponent {
  hookLog: string[] = [];

  constructor(private logger: LoggerService) {
    this.logger = logger;
    this.hookLog = logger.logs;
  }
}
