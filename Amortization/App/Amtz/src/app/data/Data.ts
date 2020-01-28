export class DataResponse {
    data: any;
    messages: string[] = [];
    constructor(param = {} as DataResponse) {
      Object.assign(this, param);
    }
  }