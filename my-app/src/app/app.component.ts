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

  hej = new TodoClass(0, "", "", false, new Date(), new Date(), false);

  constructor(private user: Todo, public dialog: MatDialog, private loginStatus: login) { }

  ngOnInit(): void {
    console.log(this.hej);
    this.loginStatus.loggedIn.subscribe(status => this.getDataIfLoggedIn(status));

    if (localStorage.getItem("loginStatus") == "true") {
      this.logins = true;
      this.cardCloseToDueDate();
      this.$data = this.user.getTodos();

      // this.cardCloseToDueDate();
    }
    else {
      this.logins = false;
    }

    // this.$data.pipe(map(dates => {
    //   for (const date of dates) {
    //     if (date.dueDate.getUTCDate() <= (dato.getUTCDate() + 1)) {
    //     date.expirationDate = true
    //     console.log("true");
    //   }
    //   else {
    //     date.expirationDate = false;
    //     console.log("false");
    //   }
    // }
    // }));

    // this.cardCloseToDueDate(this.hej);
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

    // this.$data = this.user.getTodos();

    const dato = new Date();
    console.log(dato);

    this.$data.subscribe(data => {
      data.forEach(date => {
        const hhhh = new Date(date.dueDate);

        if (hhhh.getDate() > (dato.getDate() + 1)) {
          console.log("1");
          date.expirationDate = false
        }
        else {
          date.expirationDate = true;
          console.log("2");
        }

        console.log(hhhh.getDate());
        console.log(dato.getDate() + 1);
        console.log(date.expirationDate);
        console.log(date);

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