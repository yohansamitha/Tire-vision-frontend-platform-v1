import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getLiveUserData } from '../../utils/CommonoFunctions';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('updateUserProfilePanel')
  updateUserProfilePanel!: UpdateUserProfileComponent;

  userName = localStorage.getItem('userName')!;
  userAvatar: string | null = '';

  constructor(private route: Router) {
    this.userAvatar = getLiveUserData().userAvatar;
    this.userName = getLiveUserData().username;
  }

  ngOnInit(): void {}

  getUserInitials(): string {
    return this.userName.charAt(0);
  }

  isAvatarAvailable(): boolean {
    return !!this.userAvatar;
  }

  signOut(): void {
    console.log('Signing out...');
    localStorage.clear();
    this.route.navigate(['../']);
  }
}
