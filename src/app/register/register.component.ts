import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user.mode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() user: User;

  constructor() {
    this.user = {
      photo: '',
      firstname: '',
      lastname: '',
      email: '',
      phonenumber: 0,
      age: 0,
      state: '',
      country: '',
      address: '',
      tags: '',
      newsletter: ''
    }
  }
  ngOnInit(): void {
    
    console.log(this.user);
    
  }

}
