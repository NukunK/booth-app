import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { BoothComponent } from './booth/booth.component';
import { MyBoothsComponent } from './my-booths/my-booths.component';
import { BoothDetailsComponent } from './booth-details/booth-details.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { BoothListadminComponent } from './booth-listadmin/booth-listadmin.component';
import { BoothBookingsComponent } from './booth-bookings/booth-bookings.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { UserListComponent } from './user-list/user-list.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'select-zone', component: SelectZoneComponent },
  { path: 'booth', component: BoothComponent },
  { path: 'my-booths', component: MyBoothsComponent },
  { path: 'booth-details', component: BoothDetailsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'register', component: RegisterComponent },


  { path: 'bookings', component: BookingListComponent},
  { path: 'booth-bookings', component: BoothBookingsComponent},
  { path: 'booth-list/:zone_id/:zone_name', component:BoothListadminComponent},
  { path: 'dashboardadmin', component:DashboardadminComponent},
  { path: 'users', component:UserListComponent},
  { path: 'zone-listamdin', component:ZoneListComponent},
  { path: 'event-listadmin', component:EventListComponent},
  { path: 'pending-users', component:PendingUsersComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' } // ย้ายไว้ด้านล่างสุด
];

