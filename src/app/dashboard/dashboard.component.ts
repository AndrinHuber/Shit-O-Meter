import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Entry, State} from "../Models/Entry";
import {Observable} from "rxjs";
import {EntryService} from "../Services/entry.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  date: Date = new Date();
  filteredDate: string = "";
  hours: string = "";
  minutes: string = "";
  seconds: string = "";
  startTimetext: string = "";
  startTime: Date = new Date();
  isRunning: boolean = false;
  isSaved: boolean = false;
  isStopped:boolean = false;
  checkbox = false;
  checkbox2 = false;
  Slider: any;
  endTimeHours: string = "";
  endTimeMinutes: string = "";
  endTimeSeconds: string = "";


  constructor(public entryService: EntryService) {setInterval(() => {this.date = new Date();
    if(this.date.getHours() < 10){
      this.hours = "0" + this.date.getHours().toString()+":";
    }else{
      this.hours = this.date.getHours().toString()+":";
    }
    if(this.date.getMinutes() < 10){
      this.minutes = "0" + this.date.getMinutes().toString()+":";
    }else{
      this.minutes = this.date.getMinutes().toString()+":";
    }
    if(this.date.getSeconds() < 10){
      this.seconds = "0" + this.date.getSeconds().toString();
    }else{
      this.seconds = this.date.getSeconds().toString();
    }

    this.filteredDate = this.hours+this.minutes+this.seconds;
    }, 1);}

  ngOnInit(): void {
    this.startTimetext = "*Drücke auf Start um zu Beginnen*";
  }

  start() {
      this.isRunning = true;
      this.isSaved = true;
      this.startTimetext = "Start: " + this.hours+this.minutes+this.seconds;
      this.startTime = new Date();
  }

  stop() {
    this.isRunning = false;
    this.isStopped = true;
    var time = new Date().getTime() - this.startTime.getTime();
    var date = new Date(time);
    this.endTimeHours = (date.getHours()-1).toString();
    this.endTimeMinutes = date.getMinutes().toString();
    this.endTimeSeconds = date.getSeconds().toString();
    this.endTimeHours = this.checkifoneorMoreCharacters(this.endTimeHours);
    this.endTimeMinutes = this.checkifoneorMoreCharacters(this.endTimeMinutes);
    this.endTimeSeconds = this.checkifoneorMoreCharacters(this.endTimeSeconds);
    this.startTimetext = "Zeit auf dem Klo: "+this.endTimeHours+":"+this.endTimeMinutes+":"+this.endTimeSeconds;
  }

  save(){
    this.isSaved = false;
    this.isStopped = false;
    this.startTimetext = "*Drücke auf Start um zu Beginnen*";
    let entry = new Entry();
    entry.time = this.endTimeHours+":"+this.endTimeMinutes+":"+this.endTimeSeconds
    entry.valuation = this.Slider;
    this.Slider = 0;
    if(this.checkbox){
      entry.bigOrSmall = State.big;
    }else{
      entry.bigOrSmall = State.small;
    }
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(Date().toLocaleString(), 'dd.MM.YYYY HH:mm:ss')
    entry.date = formattedDate;
    this.checkbox = false;
    this.checkbox2 = false;
    this.entryService.addEntry(entry);
    console.log(entry);
    console.log(this.entryService.getAll());
  }

  checkifoneorMoreCharacters(string: string){
    if(string.length < 2){
      var result = 0+string;
      return result;
    }else{
      return string
    }
  }

}
