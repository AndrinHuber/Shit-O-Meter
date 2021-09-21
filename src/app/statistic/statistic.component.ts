import { Component, OnInit } from '@angular/core';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {EntryService} from "../Services/entry.service";
import {Entry} from "../Models/Entry";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  entries: Entry[] = this.entryService.getAll();

  constructor(public entryService: EntryService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    console.log(this.entries);
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
    this.openSnackBar('Willst du den Table wiklich löschen?', 'Ja');
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 2000);
  }

  deleteforever(){
    localStorage.setItem("entrys", JSON.stringify(null));
    this.openEmptySnackBar('Der Table wurde Gelöscht');
    this.router.navigate(['/dashboard']);
  }

}
