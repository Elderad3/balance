

import { Component, Input, OnInit } from '@angular/core';

export class MenuContext {
  titulo: string
  descricao: string
  modulo: string

}

@Component({
  selector: 'app-menu-context',
  templateUrl: './menu-context.component.html'
})
export class MenuContextComponent implements OnInit {

  @Input() menuContext: MenuContext
  ngOnInit() {
  }

}
