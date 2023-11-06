import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagramComponent } from './diagram/diagram.component';
import { TableComponent } from './components/table/table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UICoreModule } from 'ui-builder';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { ZoomPipe } from './pipes/zoom.pipe';
import { DragDropDirective } from './directives/drag-drop.directive';
import { RelationService } from './services/relation.service';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PinchZoomDirective } from './directives/pinch-zoom.directive';

@NgModule({
  declarations: [
    DiagramComponent,
    TableComponent,
    StatusBarComponent,
    ZoomPipe,
    DragDropDirective,
    ConfirmComponent,
    PinchZoomDirective
  ],
  providers:[
    RelationService
  ],
  imports: [
    CommonModule,
    DragDropModule,
    UICoreModule,
  ],
  exports:[
    DiagramComponent,
  ]
})
export class DataModelModule { }
