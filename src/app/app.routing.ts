import {AdminProposalsComponent} from "./admin/admin-proposals/admin-proposals.component";
import {SpeakerComponent} from "./speaker/speaker.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminScheduleComponent} from "./admin/admin-schedule/admin-schedule.component";
import {AdminHomeComponent} from "./admin/admin-home/admin-home.component";
import {AdminSessionComponent} from "./admin/admin-session/admin-session.component";
import {SpeakersListComponent} from "./speakers-list/speakers-list.component";
import {ScheduleComponent} from "./schedule/schedule.component";

export const appRoutes = RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'speakers',
      component: SpeakersListComponent
    },
    {
      path: 'schedule',
      component: ScheduleComponent
    },
    {
      path: 'admin',
      component: AdminHomeComponent,
      children: [
        {
          path: 'schedule',
          component: AdminScheduleComponent,
        },
        {
          path: 'proposals',
          component: AdminProposalsComponent
        },
        {
          path: 'sessions',
          component: AdminSessionComponent
        },
        {
          path: 'sessions/:id',
          component: AdminSessionComponent
        }
      ]
    },
    {
      path: 'speaker',
      component: SpeakerComponent
    }
  ]);
