import { Injectable } from '@angular/core';

@Injectable()
export class AccountContext {

  public User = ``;
  public Organization = ``;
  public currentElement = ''; 
  public currentInstance: any;

  constructor() {}
}