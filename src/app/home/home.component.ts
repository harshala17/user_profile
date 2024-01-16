import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.mode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  users!: User[];
  countryOptions = ['India', 'USA', 'UK'];
  stateOptions = ['Maharashtra', 'Bangalore', 'Chennai'];
  usersToDisplay!: User[];
  imgSrc: string = './assets/placeholder.png';
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.users = [];
    this.usersToDisplay = this.users;
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      imageUpload: this.fb.control(''),
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      email: this.fb.control(''),
      phoneno: this.fb.control(''),
      age: this.fb.control(''),
      state: this.fb.control(''),
      country: this.fb.control(''),
      address: this.fb.control(''),
      tags: this.fb.control('')
    });

    this.userService.getUsers().subscribe((res: User[]) => {
      console.log(res);
    });
  }

  clearForm(): void {
    this.postForm.reset();
    this.fileInput.nativeElement.value = '';
  }

  onSubmit() {
    let user: User = {
      firstname: this.postForm.get('firstname')?.value,
      lastname: this.postForm.get('lastname')?.value,
      email: this.postForm.get('email')?.value,
      phonenumber: this.postForm.get('phoneno')?.value,
      age: this.postForm.get('age')?.value,
      state: this.postForm.get('state')?.value,
      address: this.postForm.get('address')?.value,
      tags: this.postForm.get('tags')?.value,
      photo: this.fileInput.nativeElement.files[0]?.name,
      country: this.postForm.get('country')?.value,
      newsletter: this.postForm.get('newsletter')?.value
    };

    this.userService.postUsers(user).subscribe((res) => {
      this.users.unshift(res);
      this.clearForm();
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  public get Photo(): FormControl {
    return this.postForm.get('photo') as FormControl;
  }

  public get Firstname(): FormControl {
    return this.postForm.get('firstname') as FormControl;
  }

  public get Lastname(): FormControl {
    return this.postForm.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.postForm.get('email') as FormControl;
  }

  public get PhoneNo(): FormControl {
    return this.postForm.get('phonenumber') as FormControl;
  }
  public get Age(): FormControl {
    return this.postForm.get('age') as FormControl;
  }
  public get State(): FormControl {
    return this.postForm.get('state') as FormControl;
  }
  public get Country(): FormControl {
    return this.postForm.get('country') as FormControl;
  }
  public get Address(): FormControl {
    return this.postForm.get('address') as FormControl;
  }
  public get Tags(): FormControl {
    return this.postForm.get('tags') as FormControl;
  }
  public get NewSletter(): FormControl {
    return this.postForm.get('newsletter') as FormControl;
  }

}
