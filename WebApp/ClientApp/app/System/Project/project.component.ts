import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
    selector: 'ngbd-modal-content',
    template: `
<form [formGroup]="CreateProjectForm">
  <div class="modal-boy">
    <div class="container">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" 
          class="form-control"
          formControlName="username" />
      </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-success" (click) = createProject()>
      Create
    </button>
  </div>
</form>
`
})
export class ProjectComponent {
    CreateProjectForm: FormGroup;
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder
    ) {
        this.createForm();
    }
    private createForm() {
        this.CreateProjectForm = this.formBuilder.group({
            name: "",
        });
    }
    private createProject() {
        this.activeModal.close(this.CreateProjectForm.value);
    }
}