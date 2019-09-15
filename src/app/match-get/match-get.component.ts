import { Component, OnInit } from '@angular/core';

import Match from '../Match';
import { MatchsService } from '../matchs.service';

@Component({
  selector: 'app-match-get',
  templateUrl: './match-get.component.html',
  styleUrls: ['./match-get.component.css']
})
export class MatchGetComponent implements OnInit {

  matchs: Match[];
  constructor(private ps: MatchsService) { }

  ngOnInit() {
    this.ps
      .getMatchs()
      .subscribe((data: Match[]) => {
        this.matchs = data;
    });
  }


}
