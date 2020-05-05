import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
  
  constructor() {
    
  }

  makeFileRequest(url: string, files: FileList) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      
      xhr.open('POST', url, true);
      xhr.send(formData);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          }else {
          reject(xhr.response);
          }
        } 
      }
    });
  }
}
