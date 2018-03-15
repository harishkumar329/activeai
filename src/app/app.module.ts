import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppComponent } from './app.component';
import { MappingComponent } from './mapping/mapping.component';
import { SourceComponent } from './source/source.component';
import { TestmappingComponent } from './testmapping/testmapping.component';
import { MappingService } from './mapping.service';


const appRoutes: Routes = [
  { 'path': "mapping", component: MappingComponent },
  { 'path': "source", component: SourceComponent },
  { 'path': "test", component: TestmappingComponent },
  { 'path': "", component: MappingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MappingComponent,
    SourceComponent,
    TestmappingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    NgDragDropModule.forRoot()
  ],
  providers: [MappingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
