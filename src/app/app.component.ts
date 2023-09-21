import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { DataSource, Menu } from 'ui-builder/core';
import { InputFieldOption } from 'projects/ui-sdk-designer/input-field';
import { MenuOption } from 'projects/ui-sdk-designer/menu';
import { counterList } from './country.data';
import { CircleOptions } from 'projects/ui-sdk-designer/progress-indicator';
import { DataField, DataModelOptions, DataTable } from 'projects/ui-sdk-designer/data-model';
import { ToasterService } from 'projects/ui-sdk-designer/toast-notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
  title = 'ui-builder-work-space';
  option1: InputFieldOption = new InputFieldOption();
  option2: InputFieldOption = new InputFieldOption();

  loadingOption: CircleOptions = {
    name: 'Loading',
    dir: 'ltr',
    disabled: false,
    appearance: 'circle',
    diameter: 100,
    mode: 'determinate',
    state: 'start',
    color: '#0d6efd',
    value$: new BehaviorSubject(10)
  };

  menuOption: MenuOption = new MenuOption();

  dataModelOption: DataModelOptions = new DataModelOptions();

  countryList$ = of(counterList);

  constructor(public toasterService: ToasterService, public viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void
  {
    this.option1.label = 'Input Field1';
    this.option1.labelStyle = { 'width': '150px' };
    this.option1.menu = new Menu();

    this.option2.label = 'Input Field2';
    this.option2.labelStyle = { 'width': '150px' };
    this.option1.dir = 'rtl'
    this.option2.menu = new Menu();

    this.initDataModel();

    this.menuOption.itemDataSource = new DataSource<MenuItem>(this.countryList$);
  }

  initDataModel()
  {
    const studentTable = DataTable.new({ name: 'Student' });
    studentTable.fields.push(DataField.new({ name: 'StudentID', type: 'number', isKey: true }));
    studentTable.fields.push(DataField.new({ name: 'Name', type: 'string' }));
    studentTable.fields.push(DataField.new({ name: 'LastName', type: 'string' }));
    studentTable.fields.push(DataField.new({ name: 'Grade', type: 'number' }));
    studentTable.fields.push(DataField.new({ name: 'Transport', type: 'string' }));
    studentTable.fields.push(DataField.new({ name: 'CardNumber', type: 'string' }));
    studentTable.fields.push(DataField.new({ name: 'SchoolID', type: 'number' }));
    studentTable.fields.push(DataField.new({ name: 'SchoolType', type: 'string' }));
    studentTable.fields.push(DataField.new({ name: 'Weight', type: 'number' }));
    studentTable.fields.push(DataField.new({ name: 'HubLocationName', type: 'string' }));
    studentTable.fields.push(DataField.new({ name: 'AddressID', type: 'number' }));

    const addressTable = DataTable.new({ name: 'Address' });
    addressTable.fields.push(DataField.new({ name: 'AddressID', type: 'number', isKey: true }));
    addressTable.fields.push(DataField.new({ name: 'StreetAddress', type: 'string' }));
    addressTable.fields.push(DataField.new({ name: 'City', type: 'string' }));
    addressTable.fields.push(DataField.new({ name: 'State', type: 'string' }));
    addressTable.fields.push(DataField.new({ name: 'Zip Code', type: 'string' }));
    addressTable.fields.push(DataField.new({ name: 'Lat', type: 'number' }));
    addressTable.fields.push(DataField.new({ name: 'Lng', type: 'number' }));

    const schoolTable = DataTable.new({ name: 'School' });
    schoolTable.fields.push(DataField.new({ name: 'SchoolID', type: 'number', isKey: true }));
    schoolTable.fields.push(DataField.new({ name: 'AddressID', type: 'number' }));
    schoolTable.fields.push(DataField.new({ name: 'Name', type: 'string' }));


    /* Relation must be after create tables objects */

    addressTable.addRelation(
      addressTable.primaryField,
      studentTable,
      studentTable.getField('AddressID')!
    )

    addressTable.addRelation(
      addressTable.primaryField,
      schoolTable,
      schoolTable.getField('AddressID')!
    );

    schoolTable.addRelation(
      schoolTable.primaryField,
      studentTable,
      studentTable.getField('SchoolID')!
    );

    this.dataModelOption.addTable(studentTable);
    this.dataModelOption.addTable(addressTable);
    this.dataModelOption.addTable(schoolTable);
  }

  progress_onClick()
  {
    this.loadingOption.value$?.next(this.loadingOption.value$.value + 10);
  }

  i=0;
  toast_onClick(type: number) {
    if( type == 1) {
      this.toasterService.open('This is a Test' + (this.i++).toString(), { type: 'danger', position: 'bottom-left',progress: 'on-mouse-pause',  duration: 4000, maxStackLimit:3 });
    }
  }

  loadComponent(){

  }



}


export class MenuItem
{
  name!: string;
  code!: string;
}


