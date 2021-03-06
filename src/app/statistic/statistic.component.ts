import { Component, OnInit } from '@angular/core';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {EntryService} from "../Services/entry.service";
import {Entry} from "../Models/Entry";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";


interface timeUnits {
  value: string;
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  entries: Entry[] = this.entryService.getAll();
  data = [
    {
      name: "Bewertung",
      series: [
        {
          value: 0,
          name: "",
        }
      ]
    }
  ];
  small: number = 0;
  big: number = 0;
  dataArt = [
    {
      "name": "",
      "value": 0
    }

  ];
  dataArtRound = [
    {
      "name": "",
      "value": 0
    }
  ];
  dataDuration = [
    {
      name: "",
      value: 0,
    }
  ];
  view: [number, number] = [700, 300];
  viewArt: [number, number] = [365, 300];
  viewDuration: [number, number] = [700, 300];
  validationAverage: number = 0;
  timeAverageSeconds: number = 0;
  timeAverageMinutes: number = 0;
  timeAverageHours: number = 0;
  timeAverage: number = 0;
  selectedValue: string = 'Minuten';
  favoriteWay: String = '';
timeUnits = [] = [
    {value: 'Sekunden'},
    {value: 'Minuten'},
    {value: 'Stunden'}
  ];

  constructor(public entryService: EntryService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.init()
  }

  init(){
    this.data.shift();
    this.dataArt.shift();
    this.dataArtRound.shift();
    this.dataDuration.shift();
    var stuhlgaenge: any = [];
    if(this.entries){
      this.timeAverage = 0;
      this.timeAverageSeconds = 0;
      this.timeAverageMinutes = 0;
      this.timeAverageHours = 0;
      for (let i = 0; i < this.entries.length; i++) {
        this.validationAverage = this.validationAverage + this.entries[i].valuation;
        let timeSplitted = this.entries[i].time.split(":", 3)
        let timeDate = new Date();
        timeDate.setHours(Number(timeSplitted[0].valueOf()))
        timeDate.setMinutes(Number(timeSplitted[1].valueOf()))
        timeDate.setSeconds(Number(timeSplitted[2].valueOf()))
        var seconds = (timeDate.getSeconds() / 6) / 10;
        var timeinMinutes = timeDate.getMinutes() + seconds;
        var timeinSeconds = (timeinMinutes * 60);
        var timeinHours = (timeinMinutes / 60);
        var entryDates: any = [];
        entryDates.push(this.entries[i].date);
        if(this.selectedValue == 'Sekunden'){
          this.dataDuration.push({name: entryDates,  value: timeinSeconds,});
          this.timeAverageSeconds = this.timeAverageSeconds + timeinSeconds;
          this.timeAverage = this.timeAverageSeconds;
        }
        if(this.selectedValue == 'Minuten'){
          this.dataDuration.push({name: entryDates,  value: timeinMinutes,});
          this.timeAverageMinutes = this.timeAverageMinutes + timeinMinutes;
          this.timeAverage = this.timeAverageMinutes;
        }
        if(this.selectedValue == 'Stunden'){
          this.dataDuration.push({name: entryDates,  value: timeinHours,});
          this.timeAverageHours = this.timeAverageHours + timeinHours;
          this.timeAverage = this.timeAverageHours;
        }
        stuhlgaenge.push({value: this.entries[i].valuation, name: this.entries[i].date});
        if(this.entries[i].bigOrSmall == 1){
          this.small = this.small + 1;
          this.dataArt.push({name: '????', value: this.small,});
        }else{
          this.big = this.big + 1;
          this.dataArt.push({name: '????', value: this.big,});
        }
      }
      if(this.small == this.big){
        this.favoriteWay = '???? & ????';
      }else{
        if(this.small > this.big){
          this.favoriteWay = '????';
        }else{
          this.favoriteWay = '????';
        }
      }
      this.dataArtRound.push({name: '????', value: this.big,});
      this.dataArtRound.push({name: '????', value: this.small,});
      this.data.push({name: "Bewertung",series: stuhlgaenge});
      this.validationAverage = Math.round(this.validationAverage / this.entries.length * 10) / 10;
      this.timeAverage = Math.round(this.timeAverage / this.entries.length * 1000) / 1000;
    }
  }

  refreshData(){
    this.dataDuration.length = 0;
    this.dataDuration = [...this.dataDuration]
    this.init()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action).onAction().subscribe(() => {
      this.deleteforever();
    });
  }

  openEmptySnackBar(message: string) {
    this._snackBar.open(message);
  }

  deleteTable(){
    this.openSnackBar('Willst du den Table wiklich l??schen?', 'Ja');
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 2000);
  }

  deleteforever(){
    localStorage.setItem("entrys", JSON.stringify(null));
    this.openEmptySnackBar('Der Table wurde Gel??scht');
    this.router.navigate(['/dashboard']);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
