import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo, TodoClass } from '../todo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.less']
})
export class EditDialogComponent {

  newData = new TodoClass(this.data.todoId, this.data.titel, this.data.description, this.data.completed, this.data.dateAdded, this.data.dueDate, this.data.expirationDate);

  constructor(@Inject(MAT_DIALOG_DATA) public data: TodoClass, private user: Todo, public dialog: MatDialog) { }

  editTasks(): void {
    this.newData.dueDate = new Date(this.newData.dueDate);
    const newDate = this.newData.dueDate.getTimezoneOffset() * 60000;
    this.newData.dueDate = new Date(this.newData.dueDate.getTime() - newDate);

    const data = new Date();
    // if (this.newData.dueDate.getDate() > (new Date().getDate() + 1)) {
    //   this.newData.expirationDate = false
    // }
    // else {
    //   this.newData.expirationDate = true;
    // }

    if ((this.data.dueDate.getDate() == (data.getDate())) || (this.data.dueDate.getDate() == (data.getDate() + 1))) {
      if (this.data.dueDate.getMonth() == data.getMonth()) {
        if (this.data.dueDate.getFullYear() == data.getFullYear()) {
          this.data.expirationDate = true;
        }
      }
    }
    else {
      this.data.expirationDate = false;
    }

    this.user.editTodos(this.data.todoId, this.newData).subscribe();
    this.dialog.closeAll();
  }
}