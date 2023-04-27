import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}! {{id}}</h1>
  <button (click)='save()'>CLICK me</button>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {}
