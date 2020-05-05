import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: FileList;
  public saveProject: any;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  )
  {
    this.title = 'Crear proyecto',
      this.project = new Project('', '', '', '', '', 2020, '');
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    
    this._projectService.saveProject(this.project).subscribe(

      response => {
        if (response.project) {
          if (this.filesToUpload) {
            this._uploadService
              .makeFileRequest(Global.url + 'image/' + response.project._id, this.filesToUpload)
              .then((result: any) => {
                this.status = "success";
                this.saveProject = result.project;
                form.reset();
              });
          } else {
            this.status = "success";
            this.saveProject = response.project;
            form.reset();
          }
        }
        else {
          this.status = "failde";
        }
      },

      error => { console.log(<any>error); }

    )
  }

  fileChangeEvent(inputEvent) {
    this.filesToUpload = inputEvent.target.files;
  }
 

}
