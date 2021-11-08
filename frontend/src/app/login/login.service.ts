import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class LoginService{
  host = environment.host+"users";
  private token: string;
  private isAuth: boolean;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getAuthData();
  }
  login(email,password){
    this.http.post<{status:string,token:string,expiresIn:number}>(this.host,{email,password})
      .subscribe(data =>{
        if(data.status=="Success"){
          const token = data.token;
          this.token = token;
          this.isAuth = true;
          if (token) {
            const expiresInDuration = data.expiresIn;
            // console.log(expiresInDuration);
            this.setAuthTimer(expiresInDuration);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate);
            this.router.navigate(['/courses'])
          }

        }else{
          alert("Something Went Wrong!");
        }
      });
  }
  signOut() {
    this.token = null;
    this.isAuth = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login'])
  }

  private setAuthTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.signOut()
    }, expiresInDuration * 1000);

  }

  private saveAuthData (token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  private clearAuthData () {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.authStatusListener.next(false);
  }
  getToken() {
    return  localStorage.getItem('token');
  }



  getIsAuth() {
    return this.isAuth;
  }
  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }


  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    this.isAuth=true;
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

}
