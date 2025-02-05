import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateUserProfile } from '../../../model/user/user';
import { UserProfileService } from '../../../services/user-profile.service';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  // This will hold the data for the form
  userInfo: UpdateUserProfile = new UpdateUserProfile();

  constructor(
    private userProfileService: UserProfileService,
  ) { }

  ngOnInit(): void {


    this.userProfileService.getUserProfileInfo().subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        this.userInfo = res.data;
      }
    });

  }

  //Method to handle form submission
  onSubmit(): void {
    console.log(this.userInfo);

    const updatedUserInfo = { ...this.userInfo }
    delete updatedUserInfo.id

    this.userProfileService.updateUserProfileInfo(updatedUserInfo).subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        alert(res.message);
      } else {
        console.log('Error updating user profile');
      }
    });
  }


}
