import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/services/backend.service';
import { CONTENTS, FILES, BaseURL } from 'src/reference/api.constant';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { AccountContext } from '../../../services/account.context';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  data: any;
  loading: boolean = false;

  view: string = 'grid';

  fileUpload = {
    uploading: false,
    percentage: null,
    success: false
  }

  activeBreadcrumbItem = {
    name: 'Home',
    path: '/',
    id: 'home'
  };

  breadcrumbItems: any = [{
    name: 'Home',
    path: '/',
    id: 'home'
  }];

  constructor(
    public http: HttpClient,
    public router: Router,
    public backendService: BackendService,
    public accountContext: AccountContext,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getContents();
  }

  getContents() {
    this.loading = true;
    this.backendService.getDataService(`${CONTENTS}?path=/`)
    .subscribe((res: any) => {
      this.data = res.data;
      this.loading = false;
    }, err => this.loading = false);
  }

  getSubContents(id: any) {
    this.loading = true;
    this.backendService.getDataService(`${CONTENTS}/${id}`)
    .subscribe((res: any) => {
      this.data = res.data;
      this.loading = false;
    }, err => this.loading = false);
  }

  getFile(item: any) {
    let contentHeaders = new HttpHeaders({ 'Authorization': `User ${this.accountContext.User}, Organization ${this.accountContext.Organization}, Element ${this.accountContext.currentElement}`});
    this.http.get(`${BaseURL}${FILES}/${item.id}`, { responseType: 'text', headers: contentHeaders })
      .subscribe(data => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          let fileName = item.name;
          let url = URL.createObjectURL(blob);
          let link = document.createElement("a");
          if (link.download !== undefined) {
            link.setAttribute("href", url);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
      }, err => {});
  }

  itemClick(el: any) {
    if (el.directory) {
      this.getSubContents(el.id);
      this.activeBreadcrumbItem = el;
      this.breadcrumbItems.push(el);
    } else {
      this.getFile(el);
    }
  }

  navigateToInstanceList(e: Event) {
    e.preventDefault();
    this.accountContext.currentElement = null;
    this.accountContext.currentInstance = null;
    this.router.navigate(['/']);
  }

  uploadFileClick() { document.getElementById('upload-file').click(); }

  uploadFileChange(files: File[]) {
    let formData = new FormData();
    this.fileUpload.uploading = true;
    Array.from(files).forEach(f => formData.append('file',f))
    let contentHeaders = new HttpHeaders({ 'Authorization': `User ${this.accountContext.User}, Organization ${this.accountContext.Organization}, Element ${this.accountContext.currentElement}`});
    this.http.post(`${BaseURL}${FILES}?path=${this.activeBreadcrumbItem.path}`, formData, { headers: contentHeaders, reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUpload.percentage = Math.round(100 * event.loaded / event.total);
          
        } else if (event instanceof HttpResponse) {
          this.fileUpload.success = true;
          this.fileUpload.uploading = false;
          if (this.activeBreadcrumbItem.path == '/') {
            this.getContents();
          } else {
            this.getSubContents(this.activeBreadcrumbItem.id)
          }
        }
    }, err => { this.fileUpload.uploading = false; });
  }

  breadcrumbItemClick(e: Event, item: any, index: number) {
    e.preventDefault();
    if (item.id == this.activeBreadcrumbItem.id) return;
    this.activeBreadcrumbItem = item;
    if (this.activeBreadcrumbItem.path == '/') {
      this.getContents();
    } else {
      this.getSubContents(this.activeBreadcrumbItem.id)
    }
    this.breadcrumbItems.splice(index + 1, this.breadcrumbItems.length - (index + 1) );
  }

}
