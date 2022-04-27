import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[homeColorMenu]'
})
export class ColorMenuDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.cambiar('blue');
  }

  @HostListener('mouseleave') onmouseleave(){
    this.cambiar(null);
  }

  private cambiar(color:string){
    this.el.nativeElement.style.backgroundColor=color;
  }


  constructor(private el:ElementRef) { 
    el.nativeElement.style.backgroundColor = '';
  }

}
