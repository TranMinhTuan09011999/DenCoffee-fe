import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DenCoffee-fe';

  isLoading = true;

  constructor(private router: Router,
              private loadingService: LoadingService) {
    this.loadingService.setApp(this);
    // @ts-ignore
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      const self = this;
      setTimeout(() => {
        self.loadingService.stopLoading();
      }, 500);
    }
    if (event instanceof NavigationCancel) {
      this.loadingService.stopLoading();
    }
    if (event instanceof NavigationError) {
      this.loadingService.stopLoading();
    }
  }

}
