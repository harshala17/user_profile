import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user.mode';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users:User[]=[];
  registerModal: any;

  constructor(private userService:UserService,
    private http:HttpClient,
    private router:Router,
    private modalService: NgbModal) {
    
  }
//   getImage() {
//     this.http.get<{imageUrl: string}>('http://localhost:3000/api/images/').subscribe(response => {
//   const imageUrl = response.imageUrl;
//   this.http.get(imageUrl, { responseType: 'blob' }).subscribe(response => {
//     saveAs(response, 'image.jpg');
//   });
//   // continue with the next step
// });
//   }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data)=>{
      this.users= data;
      // this.getImage()
      
    },
    (error)=>{
      console.log('Some error occured');
      
    })
    
  }

 

}
