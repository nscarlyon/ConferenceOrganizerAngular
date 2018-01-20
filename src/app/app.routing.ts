import {AdminProposalsComponent} from "./admin/admin-proposals/admin-proposals.component";
import {SpeakerComponent} from "./speaker/speaker.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminScheduleComponent} from "./admin/admin-schedule/admin-schedule.component";
import {AdminHomeComponent} from "./admin/admin-home/admin-home.component";

export const appRoutes = RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'admin',
      component: AdminHomeComponent,
      children: [
        {
          path: 'schedule',
          component: AdminScheduleComponent
        },
        {
          path: 'proposals',
          component: AdminProposalsComponent
        }
      ]
    },
    {
      path: 'speaker',
      component: SpeakerComponent
    }
  ]);
