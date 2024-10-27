import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  text: string;
  color: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  taskText: string = '';
  taskColor: string = '#FFFAE6';  // Default color
  tasks: Task[] = [];
  colors: { name: string, hex: string }[] = [
    { name: 'Light Yellow', hex: '#FFFAE6' },
    { name: 'Light Sky Blue', hex: '#E6F7FF' },
    { name: 'Light Mint Green', hex: '#E6FFE6' },
    { name: 'Peach Puff', hex: '#FFF3E6' },
    { name: 'Lavender Blush', hex: '#F5E6FF' }
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.getTasks();
  }

  addTask(): void {
    if (this.taskText.trim()) {
      this.tasks.push({ text: this.taskText, color: this.taskColor, completed: false });
      this.saveTasks();
      this.taskText = '';
    }
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  editTask(task: Task): void {
    const newText = prompt('Edit Task:', task.text);
    if (newText !== null && newText.trim() !== '') {
      task.text = newText.trim();
      this.saveTasks();
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks(): void {
    this.todoService.saveTasks(this.tasks);
  }
}
