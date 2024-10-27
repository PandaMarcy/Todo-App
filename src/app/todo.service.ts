import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'tasks';

  getTasks() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveTasks(tasks: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
