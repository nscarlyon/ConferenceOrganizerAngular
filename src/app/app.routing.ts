import {AdminComponent} from "./admin/admin.component";
import {SpeakerComponent} from "./speaker/speaker.component";
import {RouterModule} from "@angular/router";

export const appRoutes = RouterModule.forRoot([
    {
      path: 'admin',
      component: AdminComponent
    },
    {
      path: 'speaker',
      component: SpeakerComponent
    }
  ]);
