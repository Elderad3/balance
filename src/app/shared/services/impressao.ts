import { Injectable} from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class ImpressaoService {

  constructor() { }

  gerarPDF(element:string, remove: string) {
    document.getElementById(remove).remove()
    var data = document.getElementById(element);
  
    html2canvas(data, {scale:2}).then(canvas => {
     
      var imgWidth = 210;
      var pageHeight = 295;

      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png', 1.0)
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;


      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
      window.open(pdf.output('bloburl').toString(), '_blank');
     // pdf.save('newPDF.pdf');
    });
  }
}


