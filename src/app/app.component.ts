import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <h1>{{title}}</h1>
    <p>
      Angular App Works!
    </p>
  `,
    styles: []
})
export class AppComponent {
    title = 'Angular Travis CI Github Pages';
}
