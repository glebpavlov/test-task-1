import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  /**
   * список элементов меню
   */
  public links = [
    {
      label: 'First',
      path: 'first',
    },
    {
      label: 'Second',
      path: 'second',
    },
    {
      label: 'Телеканалы',
      path: 'channels',
    }
  ];

}
