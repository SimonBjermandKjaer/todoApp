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

    if (this.data.dueDate.getDate() > (this.data.dateAdded.getDate() + 1)) {
      this.data.expirationDate = false
    }
    else {
      this.data.expirationDate = true;
    }

    this.data.dueDate.setDate(this.data.dueDate.getDate() + 1);

    this.user.postTodos(this.data).subscribe();
    this.appComponent.cardCloseToDueDate();
    this.dialog.closeAll();
  }
}