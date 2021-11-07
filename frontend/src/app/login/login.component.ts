import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  email;
  password;
  isAuth;
  subscription: Subscription;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuth = this.loginService.getIsAuth();
    if(this.isAuth){
      this.redirectToHome();
    }
    this.subscription = this.loginService.getAuthStatusListner().subscribe(
      isAuth =>{
        if(isAuth){
          this.redirectToHome();
        }
      }
    )
  }
  onLogin() {
      this.loginService.login(this.email,this.password);
  }
  private redirectToHome(){
    this.router.navigate(['courses']);
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
