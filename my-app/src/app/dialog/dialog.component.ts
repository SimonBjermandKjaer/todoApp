import { Component } from '@angular/core';
import { Todo, TodoClass } from '../todo.service';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-root',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})

export class DialogComponent {

  data = new TodoClass(0, "", "", false, new Date(), new Date(), false);

  constructor(private user: Todo, public dialog: MatDialog, public appComponent: AppComponent) { }

  addTodos(): void {


    // const newDate = this.data.dueDate.getTimezoneOffset() * 60000;
    // this.data.dueDate = new Date(this.data.dueDate.getTime() - newDate);

    // this.appComponent.cardCloseToDueDate(this.data);

    if (this.data.dueDate.getDate() > (this.data.dateAdded.getDate() + 1)) {
      this.data.expirationDate = false
    }
    else {
      this.data.expirationDate = true;
    }

    this.user.postTodos(this.data).subscribe();
    this.dialog.closeAll();
  }
}