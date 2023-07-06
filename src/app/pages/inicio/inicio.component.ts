import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html"
})
export class InicioComponent implements OnInit {
  titulo: string = 'Giro Líquido'
  data: any;
  constructor(private titleService: Title, private metaService: Meta) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.titulo);
    this.metaService.addTags([
      { name: 'description', content: 'Ferramentas Online e Gratuitas.' },
      { name: 'robots', content: 'index, follow' }
    ]);

  }
}
