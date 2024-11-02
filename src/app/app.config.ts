import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http'; // เพิ่มการนำเข้า provideHttpClient

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { BoothComponent } from './booth/booth.component';
import { MyBoothsComponent } from './my-booths/my-booths.component';
import { BoothDetailsComponent } from './booth-details/booth-details.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';

const routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'select-zone', component: SelectZoneComponent },
  { path: 'booth', component: BoothComponent },
  { path: 'my-booths', component: MyBoothsComponent },
  { path: 'booth-details', component: BoothDetailsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' as 'full' } // ย้ายไว้ด้านล่างสุด และแก้ไข pathMatch
];


export const appConfig: ApplicationConfig = {
providers: [
provideZoneChangeDetection({ eventCoalescing: true }),
provideClientHydration(),
provideAnimations(),
provideRouter(routes),
provideHttpClient(withFetch())
]
};