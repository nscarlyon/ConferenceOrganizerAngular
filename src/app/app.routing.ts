import {AdminComponent} from "./admin/admin.component";
import {SpeakerComponent} from "./speaker/speaker.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";

export const appRoutes = RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'admin',
      component: AdminComponent
    },
    {
      path: 'speaker',
      component: SpeakerComponent
    }
  ]);
