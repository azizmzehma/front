
import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/BackOffice/back-all/Models/Tasks';
@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }
}
