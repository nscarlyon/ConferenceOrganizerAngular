import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-proposals',
  templateUrl: 'admin-proposals.component.html',
  styleUrls: ['admin-proposals.component.css']
})
export class AdminProposalsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  goToSessionPage(id: number): void {
    this.router.navigate([`../sessions/${id}`], {relativeTo: this.activatedRoute})
  }

}
