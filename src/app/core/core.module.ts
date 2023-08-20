import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuContextComponent } from './components/menu-context/menu-context.component';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuContextComponent, MenuLateralComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, MenuContextComponent, MenuLateralComponent]
})
export class CoreModule { }
