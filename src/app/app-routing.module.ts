import { FaceIdentificationComponent } from './pages/face-identification/face-identification.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: 'identification', pathMatch: 'full' },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: RegistrationComponent },
  { path: 'identification', component: FaceIdentificationComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'identification', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
