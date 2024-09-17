import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
import { MainSocketService } from '../main-socket.service';
import { Common } from '../common';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  userName = '';
  password = '';
  //returnUrl: string|undefined;
 
 

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService,
    private socket: MainSocketService,
   
  ) {

  }
  ngOnInit(): void {
   
  }

  openMessage(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000
    })
  }

  login(){
    
   this.webService.action(Common.svLogin, { "email": this.userName, "password": this.password, "socket_id": this.socket.sid  } )
    .then( (responseObj: any) => {
      Common.Dlog(responseObj);
      if(responseObj.status == 1) {

        localStorage.setItem("auth_token", responseObj.payload.auth_token )
        //this.router.navigate([this.returnUrl]);
        this.router.navigate(["/"]);
      }else{
        this.openMessage(responseObj.message);
      }
    } )
  }

}
