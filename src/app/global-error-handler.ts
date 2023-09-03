import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.log(error);
    // throw new Error("Method not implemented.");
  }

}