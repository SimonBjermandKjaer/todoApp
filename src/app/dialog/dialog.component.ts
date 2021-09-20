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

    // if (this.data.dueDate.getDate() > (this.data.dateAdded.getDate() + 1)) {
    //   this.data.expirationDate = false
    //   console.log(1);
    // }
    // else {
    //   this.data.expirationDate = true;
    //   console.log(2);
    // }

    this.data.dueDate = new Date(this.data.dueDate);
    const newDate = this.data.dueDate.getTimezoneOffset() * 60000;
    this.data.dueDate = new Date(this.data.dueDate.getTime() - newDate);

    this.data.expirationDate = false;
    if ((this.data.dueDate.getDate() == (this.data.dateAdded.getDate())) || (this.data.dueDate.getDate() == (this.data.dateAdded.getDate() + 1))) {
      if (this.data.dueDate.getMonth() == this.data.dateAdded.getMonth()) {
        if (this.data.dueDate.getFullYear() == this.data.dateAdded.getFullYear()) {
          this.data.expirationDate = true;
        }
      }
    }


    console.log();

    console.log('Due Date:', 'Day:', this.data.dueDate.getDate(), ', Month: ', this.data.dueDate.getMonth());
    console.log('Date Added: ', this.data.dateAdded.getMonth());

    console.log('Expiration Date: ', this.data.expirationDate);

    this.appComponent.cardCloseToDueDate();

    this.user.postTodos(this.data).subscribe();

    this.dialog.closeAll();
  }
}