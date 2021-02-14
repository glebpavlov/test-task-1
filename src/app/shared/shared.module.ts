import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';
import { PluralCasePipe } from './pipes/plural-case.pipe';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    FilterSelectComponent,
    PluralCasePipe,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterSelectComponent,
    PluralCasePipe,
    LoadingComponent
  ]
})
/** модуль общих элементов */
export class SharedModule {
}
