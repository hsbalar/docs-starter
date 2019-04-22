import { Injectable } from '@angular/core';

@Injectable()
export class AccountContext {

  public currentElement = ''; 
  public currentInstance: any;

  constructor() {}
}