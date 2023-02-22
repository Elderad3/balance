import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html'
})
export class SobreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.setFillColor(204, 204,204,0);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
     window.open(pdf.output('bloburl').toString(), '_blank');
     // pdf.save('newPDF.pdf');
    });
  }

}
