import { Injectable } from '@angular/core';
import {Entry} from "../Models/Entry";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  public entrys: Entry[] = [];

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 2000);
  }

  public addEntry(entry: Entry) {
    if(JSON.parse(<string>localStorage.getItem("entrys"))){
      this.entrys = JSON.parse(<string>localStorage.getItem("entrys"));
    }
    this.entrys.push(entry);
    console.log(this.entrys);
    localStorage.setItem("entrys", JSON.stringify(this.entrys));
    this.openSnackBar('Schiss wurde zu deiner Liste hinzugefügt!')
  }

  public getAll() {
    return JSON.parse(<string>localStorage.getItem("entrys"));
  }
}
