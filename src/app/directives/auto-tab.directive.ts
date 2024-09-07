import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoTab]',
  standalone: true,
})
export class AutoTabDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    let nextElement = this.el.nativeElement.nextElementSibling;
    let previousElement = this.el.nativeElement.previousElementSibling;

    if (value.length === 1 && nextElement) {
      (nextElement as HTMLInputElement).focus();
    }

    if (value.length === 0 && previousElement) {
      (previousElement as HTMLInputElement).focus();
    }
  }
}
