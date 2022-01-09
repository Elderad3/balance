import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const ROTAS: Routes = [

  { path: '', component: InicioComponent },
  { path: 'analise-de-balanco', loadChildren: () => import('./pages/analise-de-balancos/home/home.module').then(m => m.HomeMainModule) },
  { path: 'analise-financeira-de-projeto', loadChildren: () => import('./pages/analise-de-projetos/analise-de-projetos.module').then(m => m.AnaliseDeProjetosModule) },
  { path: 'cnaes-impeditivos-simples-nacional', loadChildren: () => import('./pages/simples-nacional/cnaes-impeditivos/cnaes-impeditivos.module').then(m => m.CnaesImpeditivosModule) },
  { path: 'financiamento-sac', loadChildren: () => import('./pages/financiamento-sac/financiamento-sac.module').then(m => m.FinanciamentoSacModule) },
  { path: 'termos-de-uso', loadChildren: () => import('./pages/termos-de-uso/termos-de-uso.module').then(m => m.TermosDeUsoModule) },
  { path: 'politica-de-privacidade', loadChildren: () => import('./pages/politica-de-privacidade/politica-de-privacidade.module').then(m => m.PoliticaDePrivacidadeModule) },
  { path: 'sobre', loadChildren: () => import('./pages/sobre/sobre.module').then(m => m.SobreModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROTAS,
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
