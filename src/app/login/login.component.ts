import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { loginClass, Todo } from '../todo.service';
import { login } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent {

  loginData = new loginClass("", "", "", "", "");

  constructor(private user: Todo, public dialog: MatDialog, private loginService: login) { }

  login(): void {
    this.user.login(this.loginData).subscribe(
      (res) => {
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('loginStatus', "true");
        this.loginService.userLoggedIn();
      },
      err => {
        if (err.status == 400)
        alert("Wrong username or password");
        else
          alert(err);
      }
    );
    this.dialog.closeAll()
  }
}