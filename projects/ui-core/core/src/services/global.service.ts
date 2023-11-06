import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class GlobalService  {   
    private static instanceCounter = 0;
    private instanceNumber = GlobalService.instanceCounter++;
    constructor(){
      console.log('sss', this.instanceNumber);
      if(this.instanceNumber > 0) {
        throw 'MyService must be kept a singleton but more than one instance was created';
      }
    }
}
 