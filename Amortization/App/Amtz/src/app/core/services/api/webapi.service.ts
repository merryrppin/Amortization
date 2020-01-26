import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders
} from "@angular/common/http";

import { Injectable, NgZone } from "@angular/core";
import { URlApi } from "src/environments/environment";
import { MessagesService } from "../../general/messages.service";

export interface IGet {
  controller: string;
  action: string;
  params?: HttpParams;
  headers?: HttpHeaders;
}

export interface IPost extends IGet {
  body: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebapiService {
    constructor(
      private http: HttpClient,
      private messagesSvc: MessagesService,
      private zone: NgZone
    ) {}
    async get<T>(optionsGet: IGet, showError: boolean = false): Promise<T> {
        const defaultHeader = this.buildHeader(optionsGet.headers);
        const Uri = this.buildUrl(optionsGet.controller, optionsGet.action);
        let options: { headers: HttpHeaders; params?: HttpParams } = {
          headers: defaultHeader
        };
        if (optionsGet.params) options.params = optionsGet.params;
    
        return null;
        // return this.http
        //   .get<T>(Uri, options)
        //   .pipe(
        //     map(resp => {
        //       return resp;
        //     }),
        //     catchError((err, ob) => {
        //       this.errorHandler<T>(err, showError);
        //       return ob;
        //     })
        //   )
        //   .toPromise();
      }

      async post<T>(optionsPost: IPost, showError: boolean = false): Promise<T> {
        const defaultHeader = this.buildHeader(optionsPost.headers);
        const Uri = this.buildUrl(optionsPost.controller, optionsPost.action);
        let options: { headers: HttpHeaders; params?: HttpParams } = {
          headers: defaultHeader
        };
        if (optionsPost.params) options.params = optionsPost.params;
    
        return null;
        // return this.http
        //   .post<T>(Uri, optionsPost.body, options)
        //   .pipe(
        //     map(resp => {
        //       return resp;
        //     }),
        //     catchError((err, ob) => {
        //       this.errorHandler<T>(err, showError);
        //       return ob;
        //     })
        //   )
        //   .toPromise();
      }
      
  private buildUrl(controller: string, action: string, URL?: string): string {
    let Uri: string = URL ? URL : URlApi;
    if (controller) Uri = !Uri.endsWith("/") ? `${Uri}/` : Uri;
    Uri = `${Uri}${controller}`;
    Uri = action ? `${Uri}/${action}` : Uri;
    return Uri;
  }

  private buildHeader(headers?: HttpHeaders): HttpHeaders {
    let defaultHeader = this.getDefaultHeader();
    if (headers)
      headers.keys().forEach(key => {
        defaultHeader = defaultHeader.set(key, headers.get(key));
      });
    return defaultHeader;
  }

  private getDefaultHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    return headers;
  }

  private errorHandler = <T>(
    e: HttpErrorResponse,
    showError: boolean = false
  ): Promise<T> => {
    if (showError && e.status != 401)
      this.zone.run(async () => {
        await this.messagesSvc.showErrorMessage(
          `${e.error ? e.error.Message : e.message}`
        );
      });
    throw e;
  };
}