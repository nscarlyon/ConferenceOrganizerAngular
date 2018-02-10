import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})
export class AdminScheduleComponent implements OnInit {
  schedule: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.schedule = {
      rooms: ["Room A", "Room B", "Room C"],
      timeSlots: [
        {
          timeSlot: "8:00 - 9:00",
          sessions: [
            {
              speakerName: "Jane Austen",
              title: "Pride & Prejudice",
              room: "Room A",
              startHour: 8,
              startMin: 0,
              endHour: 10,
              endMin: 0
            },
            {
            },
            {
              speakerName: "Oscar Wilde",
              title: "Picture of Dorian Grey",
              room: "Room B",
              startHour: 8,
              startMin: 0,
              endHour: 9,
              endMin: 0
            }
          ]
        },
        {
          timeSlot: "9:00 - 10:00",
          sessions: [
            {

            },
            {
              speakerName: "Kent Beck",
              title: "Extreme Programming",
              room: "Room B",
              startHour: 9,
              startMin: 0,
              endHour: 10,
              endMin: 0
            },
            {

            }
            ]
        }
      ]
    }

  }

  ngOnInit() {
  }

  goToSessionPage(id: number): void {
    this.router.navigate([`../sessions/${id}`], {relativeTo: this.activatedRoute})
  }
}
