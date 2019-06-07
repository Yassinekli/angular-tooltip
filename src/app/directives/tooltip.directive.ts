import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tooltipText]'
})
export class TooltipDirective {

  tooltipWrapper: HTMLDivElement;
  @Input() tooltipText: string;
  @Input() tooltipPosition: string;
  tooltipTop: number = 0;
  tooltipLeft: number = 0;

  constructor(private el: ElementRef) {  }

  /* ------------ Events ------------ */
  @HostListener('mouseenter') 
  onMouseEnter() {
    this.tooltipWrapper = document.getElementById('tooltip-wrapper') as HTMLDivElement;
    
    // Change Tooltip Text.
    this.changeTooltipText();

    //
    let distances: ElementTopBottomRightLeft = this.getHoveredElementDistances(this.getElementRect());
    
    console.log(this.getRightPositioning(distances));

    // Change Tooltip Position.
    /*this.setTooltipPosition();

    // Show Tooltip.
    this.showTooltip(); */
  }
  
  @HostListener('mouseleave') 
  onMouseLeave() {
    // Remove added class
    this.tooltipWrapper.classList.remove('tooltip-' + this.tooltipPosition);
    
    // Hide Tooltip.
    // this.hideTooltip();
  }
  
  /* ------------ Methods ------------ */
  private changeTooltipText() {
    (document.getElementById('tooltip') as HTMLDivElement).innerText = this.tooltipText;
  }

  private getElementRect(): DOMRect{
    return this.el.nativeElement.getBoundingClientRect();
  }
  
  private getHoveredElementDistances({ top, bottom, right, left, width, height }: DOMRect): ElementTopBottomRightLeft
  {
    right = window.innerWidth - (width + left);
    bottom = window.innerHeight - (height + top);

    return {top, bottom, right, left}
  }


  getRightPositioning(distances: ElementTopBottomRightLeft): string{
    let tooltipMargins: ElementTopBottomRightLeft = {top: 0, bottom: 0, right: 0, left: 0 };

    let marginTop = window.getComputedStyle(this.tooltipWrapper).marginTop;
    let marginBottom = window.getComputedStyle(this.tooltipWrapper).marginBottom;
    let marginRight = window.getComputedStyle(this.tooltipWrapper).marginRight;
    let marginLeft = window.getComputedStyle(this.tooltipWrapper).marginLeft;

    tooltipMargins.top = parseFloat(marginTop.substring(0, marginTop.length - 2));
    tooltipMargins.bottom = parseFloat(marginBottom.substring(0, marginBottom.length - 2));
    tooltipMargins.right = parseFloat(marginRight.substring(0, marginRight.length - 2));
    tooltipMargins.left = parseFloat(marginLeft.substring(0, marginLeft.length - 2));

    let tooltipWidth = this.tooltipWrapper.getBoundingClientRect().width + (tooltipMargins.right + tooltipMargins.left);
    let tooltipHeight = this.tooltipWrapper.getBoundingClientRect().height + (tooltipMargins.top + tooltipMargins.bottom);

    let selectedPosition = distances[this.tooltipPosition];
    switch (this.tooltipPosition) {
      case 'top':
        if(tooltipHeight <= selectedPosition)
          return 'top';
          
      case 'bottom':
        if(tooltipHeight <= selectedPosition)
          return 'bottom';

      case 'right':
        if(tooltipHeight <= selectedPosition)
          return 'right';

      case 'left':
        if(tooltipHeight <= selectedPosition)
          return 'left';
    
      default:
        if(tooltipHeight <= distances.top)
          return 'top';
        if(tooltipHeight <= distances.bottom)
          return 'bottom';
        if(tooltipWidth <= distances.right)
          return 'right';
        if(tooltipWidth <= distances.left)
          return 'left';
    }
    return undefined;
  }

  private setTopCoordinations(
    hoveredTop: number, 
    tooltipHeight: number, 
    hoveredWidth: number, 
    tooltipWidth: number, 
    hoveredLeft: number
  ) 
  {
    this.tooltipTop = hoveredTop - tooltipHeight - 12;
    this.tooltipLeft = ((hoveredWidth / 2) - (tooltipWidth / 2)) + (hoveredLeft - 6);
  }

  private addTooltipArrowClass() {
    this.tooltipWrapper.classList.add('tooltip-' + this.tooltipPosition);
  }
  
  private removeTooltipArrowClass() {
    this.tooltipWrapper.classList.remove('tooltip-' + this.tooltipPosition);
  }

  private setTooltipPosition(): void{
    this.tooltipWrapper.style.top = this.tooltipTop + 'px';
    this.tooltipWrapper.style.left = this.tooltipLeft + 'px';  
  }
  
  private showTooltip(): void{
    this.tooltipWrapper.style.opacity = '1';
  }
  
  private hideTooltip(): void{
    this.tooltipWrapper.style.opacity = '0';
  }
}




interface ElementTopBottomRightLeft{
  top: number,
  bottom: number,
  right: number,
  left: number
}