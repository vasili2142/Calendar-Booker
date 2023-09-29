import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  logs: string[] = [];
  prevMsg = '';
  prevMsgCount = 1;

  log(msg: string) {
    if (msg === this.prevMsg) {
      // Repeat message, update last log entry with count
      this.logs[this.logs.length - 1] = msg + ` (${(this.prevMsgCount += 1)})`;
    } else {
      // New message; log it.
      this.prevMsg = msg;
      this.prevMsgCount = 1;
      this.logs.push(msg);
    }
  }

  clear() {
    this.logs = [];
  }

  // Schedule a view refresh to ensure display catches up
  tick() {
    this.thick_then(() => {});
  }
  thick_then(fn: () => any) {
    setTimeout(fn, 0);
  }
}
