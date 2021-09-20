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

  hej = new Date();

  data = new TodoClass(0, "", "", false, new Date(), new Date(), false);

  constructor(private user: Todo, public dialog: MatDialog, public appComponent: AppComponent) { }

  addTodos(): void {

    if (this.data.dueDate.getDate() > (this.data.dateAdded.getDate() + 1) && (this.data.dueDate.getMonth() > (this.data.dateAdded.getMonth()))) {
      this.data.expirationDate = false
    }
    else {
      this.data.expirationDate = true;
    }

    this.data.dueDate.setDate(this.data.dueDate.getDate() + 1);

    console.log(this.data.dueDate.getDate());
    console.log(this.data.dateAdded.getDate() + 1);

    console.log(this.data.dueDate.getMonth());
    console.log(this.data.dateAdded.getMonth());

    console.log(this.data.expirationDate);

    this.user.postTodos(this.data).subscribe();
    this.appComponent.cardCloseToDueDate();
    this.dialog.closeAll();
  }
}