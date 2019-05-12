import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [ 1, 2, 3, 4 ];

  /* items = [
    {id: 1, tooltipText: 'Like'},
    {id: 2, tooltipText: 'Like'},
    {id: 3, tooltipText: 'Like'},
    {id: 4, tooltipText: 'Like'}
  ]; */

  btnLikeHandler(event){
    let btnId = this.getBtnId(event.currentTarget);
    this.changeBtnInnerText(event.currentTarget);
  }

  getBtnId(btnElement): any{
    return btnElement.getAttribute('id');
  }

  changeBtnInnerText(element: HTMLButtonElement): void{
    let elementText = element.innerText;
    elementText = (elementText === 'Like') ? 'Dislike' : 'Like';
    element.innerText = elementText;
  }
  
}
