import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/services/backend.service';
import { ELEMENTS, INSTANCES } from 'src/reference/api.constant';
import { AccountContext } from 'src/services/account.context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

  loading: boolean = false;
  error = {
    isError: false,
    message: null
  }
  data: any;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private accountContext: AccountContext
  ) { }

  ngOnInit() {
    this.getInstances();
  }

  instanceClick(instance: any) {
    this.accountContext.currentInstance = instance;
    this.accountContext.currentElement = instance.token;
    this.router.navigate(['/contents']);
  }

  getInstances() {
    this.loading = true;
    this.backendService.getDataService(`${INSTANCES}`)
    .subscribe((res: any) => {
      this.data = res.data;
      this.loading = false;
      this.error.isError = false;
    }, err => {
      if (err.error.error.message) {
        this.error.message = err.error.error.message;
        this.error.isError = true;
      }
      this.loading = false
    });
  }

}
