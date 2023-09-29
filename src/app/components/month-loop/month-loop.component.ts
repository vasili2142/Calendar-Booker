import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-month-loop',
  templateUrl: './month-loop.component.html',
  styleUrls: ['./month-loop.component.css'],
})
export class MonthLoopComponent implements OnInit {
  monthDisplay: string = '';
  currentDate: Date = new Date();
  daysInMonth: number[] = [];

  taskArray: { [month: string]: { [day: number]: string[] } } = {};

  prevButtonRef!: ElementRef;
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private logger: LoggerService) {}

  ngOnInit() {
    this.displayDaysInMonth();
    this.setMonthDisplay();
    this.initializeTaskArray();

    // console.log('testObject: ');
  }

  // Display the month corresponding to the calender days
  setMonthDisplay() {
    // Displays name of current calendar month
    for (let i = 0; i < this.monthNames.length; i++) {
      let month = this.currentDate.getMonth();
      this.monthDisplay = this.monthNames[month];
    }
    // console.log(this.monthNames);
  }

  // Generates the days in the month
  displayDaysInMonth() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    const day = new Date().getDate();

    this.daysInMonth = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    // console.log('From displayDaysInMonth Method: ', this.daysInMonth);
  }

  // Displays number of days according to the displayed month
  dayDisplayCorrection() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    let daysInMonth = new Date(year, month, 30).getDate();
    if (
      this.monthDisplay == 'April' ||
      this.monthDisplay == 'June' ||
      this.monthDisplay == 'September' ||
      this.monthDisplay == 'November'
    ) {
      this.daysInMonth = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
      );
    } else if (this.monthDisplay == 'February') {
      daysInMonth = new Date(year, month, 28).getDate();
      this.daysInMonth = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
      );
    } else {
      daysInMonth = new Date(year, month, 31).getDate();
      this.daysInMonth = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
      );
    }
  }

  // Creates array to hold data for each day of each month
  initializeTaskArray() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = this.monthDisplay;
    this.taskArray[monthName] = {};

    for (let day = 1; day <= daysInMonth; day++) {
      this.taskArray[monthName][day] = [];
    }
  }

  // Month Cycle Logic for button elements
  changeToPreviousMonth() {
    const currentMonthIndex = this.monthNames.indexOf(this.monthDisplay);
    const previousMonthIndex =
      (currentMonthIndex - 1 + this.monthNames.length) % this.monthNames.length;
    this.monthDisplay = this.monthNames[previousMonthIndex];

    this.dayDisplayCorrection();
    this.initializeTaskArray();
  }
  changeToNextMonth() {
    const currentMonthIndex = this.monthNames.indexOf(this.monthDisplay);
    const nextMonthIndex =
      (currentMonthIndex + 1 + this.monthNames.length) % this.monthNames.length;
    this.monthDisplay = this.monthNames[nextMonthIndex];

    this.dayDisplayCorrection();
    this.initializeTaskArray();
  }

  // Returns the value of the day clicked
  // This will be used in the future to push data into an array corresponding to the day selected
  clickEvent(day: number) {
    let entryNum = 0;
    const monthName = this.monthDisplay;
    const todos = this.taskArray[monthName][day];

    const userTodo = prompt(
      'Enter your task for ' + this.monthDisplay + ' ' + day
    );
    if (userTodo) {
      todos.push(userTodo);
      this.logger.log(
        `\"${userTodo}\" added for ${this.monthDisplay + ' ' + day}`
      );
    }
  }

  retrieve(monthName: string) {
    if (this.taskArray[monthName]) {
      const monthData = this.taskArray[monthName];
      console.log(`Data for ${monthName}:`, monthData);
    } else {
      console.log(`No data found for ${monthName}.`);
    }
  }

  clearMonthData() {
    let input = prompt('Enter a month with the first letter capitalized');
    if (input !== null) {
      this.taskArray[input] = [];
      this.logger.log(`${input} has been cleared`);
    }
  }
}
