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
      imageUpload: ['',[Validators.required]],
      firstname: ['',[Validators.required,Validators.maxLength(20)]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phoneno: ['',[Validators.required]],
      age: ['',[Validators.required]],
      state: ['',[Validators.required]],
      country: ['',[Validators.required]],
      address: ['',[Validators.required]],
      tags: ['',[Validators.required]]
    });

    this.userService.getUsers().subscribe((res: User[]) => {
      console.log(res);
    });
  }

  clearForm(): void {
    this.postForm.reset();
    this.fileInput.nativeElement.value = '';
  }

  onSubmit(): void {
    const user: User = {
      firstname: this.Firstname.value,
      lastname: this.Lastname.value,
      email: this.Email.value,
      phonenumber: this.PhoneNo.value,
      age: this.Age.value,
      state: this.State.value,
      address: this.Address.value,
      tags: this.Tags.value,
      photo: this.fileInput.nativeElement.files[0]?.name,
      country: this.Country.value,
      newsletter: this.NewSletter.value
    };

    this.userService.postUsers(user).subscribe((res) => {
      this.users.unshift(res);
      this.clearForm();
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  public get Photo(): FormControl{
    return this.postForm.get('photo') as FormControl;
  }
  
  public get Firstname(): FormControl{
    return this.postForm.get('firstname') as FormControl;
  }
  
  public get Lastname(): FormControl{
    return this.postForm.get('lastname') as FormControl;
  }
  public get Email(): FormControl{
    return this.postForm.get('email') as FormControl;
  }
  
  public get PhoneNo(): FormControl{
    return this.postForm.get('phonenumber') as FormControl;
  }
  public get Age(): FormControl{
    return this.postForm.get('age') as FormControl;
  }
  public get State(): FormControl{
    return this.postForm.get('state') as FormControl;
  }
  public get Country(): FormControl{
    return this.postForm.get('country') as FormControl;
  }
  public get Address(): FormControl{
    return this.postForm.get('address') as FormControl;
  }
  public get Tags(): FormControl{
    return this.postForm.get('tags') as FormControl;
  }
  public get NewSletter(): FormControl{
    return this.postForm.get('newsletter') as FormControl;
  }
  
}
