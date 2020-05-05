import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: FileList;
  public saveProject: any;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  )
  {
    this.title = 'Editar proyecto',
    this.url = Global.url;
    
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params._id;
      this.getProject(id);
    })
  }

  getProject(id) {
    this._projectService.getProject(id).subscribe(
      Response => {
        this.project = Response.project;
        console.log(this.project);
      },
      Error => {
        console.log(<any>Error);
      }
    )
  }

  onSubmit(form) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
          if (this.filesToUpload) {
            this._uploadService
              .makeFileRequest(Global.url + 'uploadImage/' + response.project._id, this.filesToUpload)
              .then((result: any) => {
                this.status = "success";
                this.saveProject = result.project;
              
              });
          } else {
            this.status = "success";
            this.saveProject = response.project;
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
