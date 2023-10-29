import { Component} from '@angular/core';
import { CollectType, Dictionary, FieldOption, ScalerType } from 'ui-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
{
 constructor(){

  // const user = {
  //   name: 'John',
  //   age: 32
  // };
  // type userKeyType = keyof typeof user;
  // Object.keys(user).forEach(key => {
  //   console.log(console.log(user[key as userKeyType])) // error is shown
  // })

 }
}


export class TestModel extends FieldOption {
  x?: number = 12;
  y?: 1 | 2 | 3 = 1;
  z?: 'a' | 'b' | null = null;
  m?: number[] = [];
  n?: boolean = false;
}



