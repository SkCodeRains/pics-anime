import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModalComponent } from '../config-modal/config-modal.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: '[#app-carousel]',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, ConfigModalComponent, LazyLoadImageModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {


  @ViewChild('carousel') carousel!: NgbCarousel;
  @Output() loadMore = new EventEmitter<void>;


  private _imagesContainer!: HTMLDivElement;
  intervals: number = 0;
  public get imagesContainer(): HTMLDivElement {
    return this._imagesContainer;
  }

  @ViewChild('imagesContainer') set imagesContainer({ nativeElement }: ElementRef<HTMLDivElement>) { 
    this._imagesContainer = nativeElement;
    nativeElement.addEventListener("scroll", this.scrollEvent)

  }


  images: any;
  @Input() collections!: { files: string[] };
  show = false;
  index: number = 0;
  showSlider(index: number) {
    this.index = index;
    this.show = true;
  } 


  onSlideChange(event: any) {
    console.log(event);
    // Check if the current slide is the last slide
    if (event.current == this.carousel.slides.length - 1) {
      this.loadMore.emit();

    }
  }

  scrollEvent() {
    console.log('caLLED');

  }
  showCarousel() {
    this.show = false;
    this.intervals = 0;
  }
} 
