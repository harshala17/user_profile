import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.mode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imgSrc: string = './assets/placeholder.png';
  postForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      imageUplaod: ['',[Validators.required]],
      firstname: ['',[Validators.required,Validators.maxLength(20)]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phoneno: ['',[Validators.required]],
      age: ['',[Validators.required]],
      state: ['',[Validators.required]],
      country: ['',[Validators.required]],
      address: ['',[Validators.required]],
      tags: ['',[Validators.required]]
    })
  }

  onSubmit(){
    debugger;
    const obj = this.postForm.value; 
   
  }

  get fc(){
    return this.postForm.controls;
  }


}
