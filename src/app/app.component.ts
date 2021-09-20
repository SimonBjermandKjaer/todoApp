import { Component, OnInit } from '@angular/core';
import { Todo, TodoClass } from './todo.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Observable } from 'rxjs';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { login } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'Todo-app';

  $data = new Observable<TodoClass[]>();

  logins = false;

  constructor(private user: Todo, public dialog: MatDialog, private loginStatus: login) { }

  ngOnInit(): void {
    this.loginStatus.loggedIn.subscribe(status => this.getDataIfLoggedIn(status));

    if (localStorage.getItem("loginStatus") == "true") {
      this.logins = true;
      this.cardCloseToDueDate();
      this.$data = this.user.getTodos();
    }
    else {
      this.logins = false;
    }
  }

  getDataIfLoggedIn(value: boolean): void {
    this.logins = value;
    if (value === true) {
      this.$data = this.user.getTodos();
    }
  }

  openDialog(): void {
    this.dialog.open(DialogComponent).afterClosed().subscribe(() => {
      this.$data = this.user.getTodos();
    });
  }

  openEditDialog(cardData: TodoClass): void {
    const dialogref = this.dialog.open(EditDialogComponent, {
      data: {
        todoId: cardData.todoId,
        titel: cardData.titel,
        description: cardData.description,
        completed: cardData.completed,
        dateAdded: cardData.dateAdded,
        dueDate: cardData.dueDate
      }
    });

    dialogref.afterClosed().subscribe(() => {
      this.$data = this.user.getTodos();
    });
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent).afterClosed().subscribe(() => {
      this.$data = this.user.getTodos();
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent).afterClosed().subscribe(() => {
      this.$data = this.user.getTodos();
    });
  }

  deleteTask(id: number): void {
    this.user.deleteTodos(id).subscribe(() => {
      this.$data = this.user.getTodos();
    });
  }

  completeTask(cardData: TodoClass): void {
    cardData.completed = !cardData.completed;
    this.user.completeTodo(cardData.todoId, cardData).subscribe();
  }

  cardCloseToDueDate(): void {

    const dato = new Date();

    this.$data.subscribe(data => {
      data.forEach(date => {
        const newDate = new Date(date.dueDate);

        // if (newDate.getDate() > (dato.getDate() + 1) && (newDate.getMonth() > (dato.getMonth()))) {
        //   date.expirationDate = false
        // }
        // else {
        //   date.expirationDate = true;
        // }

        if ((newDate.getDate() == (dato.getDate())) || (newDate.getDate() == (dato.getDate() + 1))) {
          if (newDate.getMonth() == dato.getMonth()) {
            if (newDate.getFullYear() == dato.getFullYear()) {
              date.expirationDate = true;
            }
          }
        }
        else {
          date.expirationDate = false
        }

        this.user.changeStatus(date.todoId, date).subscribe();
        this.$data = this.user.getTodos();
      })
    })
  }

  logout(): void {
    localStorage.removeItem("jwt");
    localStorage.removeItem("loginStatus");
    this.loginStatus.userLoggedOut();
    this.$data = this.user.getTodos();
  }
}