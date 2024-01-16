import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.mode';
import { UserService } from '../services/user.service';
import { RouteReuseStrategy, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  @Output() usersUpdated = new EventEmitter<User[]>();
  sizeRestriction = { width: 310, height: 325 };
  users: User[];
  countryOptions = ['India', 'USA', 'UK'];
  stateOptions = ['Maharashtra', 'Bangalore', 'Chennai'];
  usersToDisplay: User[];
  imgSrc: string = './assets/placeholder.png';
  postForm!: FormGroup;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private userService: UserService,private route:Router) {
    this.users = [];
    this.usersToDisplay = this.users;
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      id:this.fb.control(''),
      // imageUpload: this.fb.control(''),
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      email: this.fb.control(''),
      phoneno: this.fb.control('default'),
      age: this.fb.control('default'),
      state: this.fb.control(''),
      country: this.fb.control(''),
      address: this.fb.control(''),
      tags: this.fb.control(''),
      newsletter:this.fb.control('')
    });

    this.userService.getUsers().subscribe((res: User[]) => {
        for(let usr of res){
          this.users.unshift(usr);
          // this.route.navigateByUrl("register");
        }
        this.usersToDisplay = this.users;
    });
  }
 
  clearForm(): void {
    this.postForm.reset();
    // this.postForm.setControl('imageUpload', this.fb.control('', [this.imageDimensionsValidator(310, 325)]));
    this.fileInput.nativeElement.value = '';
  }

  onSubmit() {
    let user: User = {
      id:this.postForm.get('id')?.value,
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
      this.route.navigateByUrl('/register')
    })
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        if (img.width === this.sizeRestriction.width && img.height === this.sizeRestriction.height) {
          this.imgSrc = img.src;
        } else {
          alert('Image dimensions must be 310x325 px.');
        }
      };
    };

    reader.readAsDataURL(file);
 }
}
