import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { NavComponent } from './components/nav/nav.component';
import { ChannelsComponent } from './views/channels/channels.component';
import { FirstComponent } from './views/first/first.component';
import { SecondComponent } from './views/second/second.component';
import { HeaderComponent } from './components/header/header.component';
import { SortingSelectComponent } from './components/sorting-select/sorting-select.component';
import { GenreSelectComponent } from './components/genre-select/genre-select.component';
import { ChannelComponent } from './components/channel/channel.component';
import { SharedModule } from '../shared/shared.module';
import { ChannelsService } from './services/channels.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedFilterService } from './services/shared-filter.service';
import { StateStorageService } from './services/state-storage.service';
import { ShowMoreComponent } from './components/show-more/show-more.component';


@NgModule({
  declarations: [
    TvComponent,
    NavComponent,
    ChannelsComponent,
    FirstComponent,
    SecondComponent,
    HeaderComponent,
    SortingSelectComponent,
    GenreSelectComponent,
    ChannelComponent,
    ShowMoreComponent
  ],
  imports: [
    CommonModule,
    TvRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    ChannelsService,
    SharedFilterService,
    StateStorageService
  ]
})
export class TvModule {
}
