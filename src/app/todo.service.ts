import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class Todo {

    // readonly APIUrl = "https://localhost:44351/api";

    // readonly loginUrl = "https://localhost:44351/Account";

    // public $todos = new BehaviorSubject<TodoClass[]>([])

    // tokenHeader: HttpHeaders = new HttpHeaders;

    // constructor(private http: HttpClient) { }

    // setTokenHeader(): HttpHeaders {
    //     return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwt') });
    // }

    // getTodos(): Observable<TodoClass[]> {
    //     this.tokenHeader = this.setTokenHeader();

    //     return this.http.get<TodoClass[]>(this.APIUrl + '/Todos', { headers: this.tokenHeader }).pipe(tap((data) => {
    //         this.$todos.next(data);
    //     }));
    // }

    // postTodos(dataToSend: TodoClass): Observable<TodoClass[]> {
    //     this.tokenHeader = this.setTokenHeader();
    //     return this.http.post<TodoClass[]>(this.APIUrl + '/Todos', dataToSend, { headers: this.tokenHeader });
    // }

    // deleteTodos(id: number): Observable<TodoClass[]> {
    //     this.tokenHeader = this.setTokenHeader();
    //     return this.http.delete<TodoClass[]>(this.APIUrl + '/Todos/' + id, { headers: this.tokenHeader });
    // }

    // editTodos(id: number, dataToSend: TodoClass): Observable<TodoClass[]> {
    //     return this.http.put<TodoClass[]>(this.APIUrl + '/Todos/' + id, dataToSend, { headers: this.tokenHeader });
    // }

    // completeTodo(id: number, val: TodoClass): Observable<TodoClass[]> {
    //     this.tokenHeader = this.setTokenHeader();
    //     return this.http.put<TodoClass[]>(this.APIUrl + '/Todos/' + id, val, { headers: this.tokenHeader });
    // }

    // registreUser(dataToSend: loginClass): Observable<loginClass[]> {
    //     this.tokenHeader = this.setTokenHeader();
    //     return this.http.post<loginClass[]>(this.loginUrl + '/register/', dataToSend, { headers: this.tokenHeader });
    // }

    // changeStatus(id: number, val: TodoClass): Observable<TodoClass[]> {
    //     this.tokenHeader = this.setTokenHeader();
    //     return this.http.put<TodoClass[]>(this.APIUrl + '/Todos/' + id, val, { headers: this.tokenHeader });
    // }

    // login(formData: loginClass): Observable<loginClass> {
    //     return this.http.post<loginClass>(this.loginUrl + '/login/', {
    //         email: formData.email,
    //         password: formData.password
    //     }, httpOptions);
    // }


//ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
    readonly APIUrl = "https://todoappbackend.azure-api.net/v1/api";

    readonly loginUrl = "https://todoappbackend.azure-api.net/v1/Account";

    public $todos = new BehaviorSubject<TodoClass[]>([])

    tokenHeader: HttpHeaders = new HttpHeaders;

    constructor(private http: HttpClient) { }

    setTokenHeader(): HttpHeaders {
        return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwt') });
    }

    setloginHeader(): HttpHeaders {
        return new HttpHeaders({ 'Ocp-Apim-Subscription-Key': '9ae76b87569c41b78b56a19c7b0ca1f3' });
    }


    getTodos(): Observable<TodoClass[]> {
        this.tokenHeader = this.setTokenHeader();

        return this.http.get<TodoClass[]>(this.APIUrl + '/Todos', { headers: this.tokenHeader }).pipe(tap((data) => {
            this.$todos.next(data);
        }));
    }

    postTodos(dataToSend: TodoClass): Observable<TodoClass[]> {
        this.tokenHeader = this.setTokenHeader();
        return this.http.post<TodoClass[]>(this.APIUrl + '/Todos', dataToSend, { headers: this.tokenHeader });
    }

    deleteTodos(id: number): Observable<TodoClass[]> {
        this.tokenHeader = this.setTokenHeader();
        return this.http.delete<TodoClass[]>(this.APIUrl + '/Todos/' + id, { headers: this.tokenHeader });
    }

    editTodos(id: number, dataToSend: TodoClass): Observable<TodoClass[]> {
        return this.http.put<TodoClass[]>(this.APIUrl + '/Todos/' + id, dataToSend, { headers: this.tokenHeader });
    }

    completeTodo(id: number, val: TodoClass): Observable<TodoClass[]> {
        this.tokenHeader = this.setTokenHeader();
        return this.http.put<TodoClass[]>(this.APIUrl + '/Todos/' + id, val, { headers: this.tokenHeader });
    }

    registreUser(dataToSend: loginClass): Observable<loginClass[]> {
        this.tokenHeader = this.setTokenHeader();
        return this.http.post<loginClass[]>(this.loginUrl + '/register/', dataToSend, { headers: this.tokenHeader });
    }

    changeStatus(id: number, val: TodoClass): Observable<TodoClass[]> {
        this.tokenHeader = this.setTokenHeader();
        return this.http.put<TodoClass[]>(this.APIUrl + '/Todos/' + id, val, { headers: this.tokenHeader });
    }

    login(formData: loginClass): Observable<loginClass> {
        this.tokenHeader = this.setloginHeader();
        return this.http.post<loginClass>(this.loginUrl + '/login/', {
            email: formData.email,
            password: formData.password
        }, httpOptions);
    }
}

export class TodoClass {
    constructor(public todoId: number, public titel: string, public description: string, public completed: boolean, public dateAdded: Date, public dueDate: Date, public expirationDate: boolean) { }
}

export class loginClass {
    constructor(public firstName: string, public lastName: string, public email: string, public password: string, public jwt: string) { }
}