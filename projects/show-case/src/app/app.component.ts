import { Component, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { CounterList } from './mock/country.data';
import { DataSource, FormControl, Menu, PageOptions } from '@ui-core/core';
import { InputField } from '@ui-designer/input-field';
import { CircleOptions } from '@ui-designer/progress-indicator';
import { MenuOption } from '@ui-designer/menu';
import { DataField, DataModelOptions, DataTable } from '@ui-designer/data-model';
import { ToasterService } from 'projects/ui/common/toast-notification';
import { ButtonOptions } from '@ui-bootstrap/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'show-case';

  pageOption: PageOptions = new PageOptions();

  option1: InputField = new InputField();
  option2: InputField = new InputField();

  loadingOption: CircleOptions = {
    ...new CircleOptions(),
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

  countryList$ = of(CounterList);

  constructor(public toasterService: ToasterService, public viewContainerRef: ViewContainerRef) {
    this.loadUIConfig();
  }

  ngOnInit(): void
  {

    this.pageOption.controls.push({type: 'button', })

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

  form: FormControl = new FormControl();
  loadUIConfig() {
    console.log(new ButtonOptions());
    this.form.createFieldControl({
      options: new ButtonOptions(),
    });
    console.log(this.form);
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

