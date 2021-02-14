import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvComponent } from './tv.component';
import { ChannelsComponent } from './views/channels/channels.component';
import { FirstComponent } from './views/first/first.component';
import { SecondComponent } from './views/second/second.component';

const routes: Routes = [
  {
    path: '', component: TvComponent,
    children: [
      {
        path: '',
        redirectTo: 'channels',
        pathMatch: 'full'
      },
      {
        path: 'channels',
        component: ChannelsComponent
      },
      {
        path: 'first',
        component: FirstComponent
      },
      {
        path: 'second',
        component: SecondComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvRoutingModule {
}
