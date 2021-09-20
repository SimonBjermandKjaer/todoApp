import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class login {

    @Output() loggedIn = new EventEmitter<boolean>();

    isLoggedIn = false;

    userLoggedIn(): void {
        this.isLoggedIn = true;
        this.loggedIn.emit(this.isLoggedIn);
    }

    userLoggedOut(): void {
        this.isLoggedIn = false;
        this.loggedIn.emit(this.isLoggedIn);
    }
}