import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user.mode';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users:User[]=[];
 
  constructor(private userService:UserService) {
    
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data)=>{
      this.users= data;
    },
    (error)=>{
      console.log('Some error occured');
      
    })
    
  }

}
