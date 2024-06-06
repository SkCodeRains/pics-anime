import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, inject, } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ICategories } from '../../interface/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[#app-config-modal]',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './config-modal.component.html',
  styleUrl: './config-modal.component.scss'
})
export class ConfigModalComponent {
  private _categories!: ICategories;
  public get url(): string {
    return localStorage.getItem("cust_url") + '';
  }
  public set url(value: string) {
    localStorage.setItem("cust_url", value);
  }

  public get categories(): ICategories {
    return this._categories;
  }

  @Output() loadImages = new EventEmitter<string>;


  @Input() set categories(value: ICategories) {
    this._categories = value;
  }
  private modalService = inject(NgbModal);

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, modalDialogClass: 'category-modal' });
  }


  get catgoriesTypes(): Array<'sfw' | 'nsfw'> {
    return Object.keys(this.categories) as Array<'sfw' | 'nsfw'>;
  }
  getImages(url: string, modal: NgbModalRef) {
    this.loadImages.emit(url);
    modal.close();
  }

  get nsfwAllowed(): boolean {
    return localStorage.getItem("nsfwAllowed") === "allowed" ? true : false
  }
}
