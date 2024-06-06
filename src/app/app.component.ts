import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RestService } from './services/rest.service';
import { ICategories, IExclude } from './interface/interface';
import { ConfigModalComponent } from './components/config-modal/config-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarouselComponent, ConfigModalComponent, CommonModule, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent implements AfterViewInit {

  title = 'pics-anime';
  categories!: ICategories;

  collections: { files: string[] } = { files: [] };

  exclude: IExclude = { exclude: [] };

  public loading = true;

  public get url(): string {
    return localStorage.getItem("cust_url") + '';
  }
  public set url(value: string) {
    localStorage.setItem("cust_url", value);
  }



  constructor(private rest: RestService) { }

  ngAfterViewInit(): void {
    if (this.url === 'null' || this.url.length === 0) {
      this.url = "sfw/smile";
    }
    this.rest.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
    this.getImages(this.url);
  }
  getImages(url: string) {
    this.exclude.exclude = this.collections.files;
    this.rest.getImages(this.exclude, url).subscribe({
      next: (data) => {
        this.collections.files = this.collections.files.concat(data.files);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    })

  }

  loadImages($event: string) {
    this.url = $event;
    this.collections.files = [];
    window.stop();
    this.getImages(this.url);
  }
  rum() {
    this.rest.rum(this.url).subscribe();
  }
}
