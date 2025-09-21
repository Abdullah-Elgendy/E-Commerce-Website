import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollNav]',
})
export class ScrollNav {
  constructor(private navBar: ElementRef) {}
  private lastScrollPos: number = 0;

  @HostListener('window:scroll', ['$event']) hideNav(event: Event) {
    const currentScrollPos: number = window.pageYOffset;
    if (currentScrollPos > this.lastScrollPos && currentScrollPos > 50) {
      this.navBar.nativeElement.classList.add('hidden-navbar');
    } else {
      this.navBar.nativeElement.classList.remove('hidden-navbar');
    }
    this.lastScrollPos = currentScrollPos;
  }
}
