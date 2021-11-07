import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  collapsed = true
  isAuth = false;
  subscription: Subscription;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isAuth = this.loginService.getIsAuth();
    this.subscription = this.loginService.getAuthStatusListner().subscribe(isAuth =>{
      this.isAuth = isAuth;
    });
  }
  onLogout(){
    this.loginService.signOut();
  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }

}
