import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';
import { EnterEmailComponent } from './components/forget-password-page/inner-items/enter-email/enter-email.component';
import { EnterOtpComponent } from './components/forget-password-page/inner-items/enter-otp/enter-otp.component';
import { EnterNewPasswordComponent } from './components/forget-password-page/inner-items/enter-new-password/enter-new-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  {
    path: 'forget-password',
    component: ForgetPasswordPageComponent,
    children: [
      { path: '', redirectTo: 'enter-email', pathMatch: 'full' },
      { path: 'enter-email', component: EnterEmailComponent },
      {
        path: 'enter-otp',
        component: EnterOtpComponent,
      },
      {
        path: 'enter-new-password',
        component: EnterNewPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
