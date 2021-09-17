import { Component } from '@angular/core';
import { loginClass, Todo } from '../todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  registerData = new loginClass("", "", "", "", "");

  constructor(private user: Todo) { }

  register(): void {
    this.user.registreUser(this.registerData).subscribe();
  }
}