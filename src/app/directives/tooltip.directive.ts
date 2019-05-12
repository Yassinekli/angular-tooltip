import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tooltipText]'
})
export class TooltipDirective {

  tooltipElement: HTMLSpanElement;
  @Input() tooltipText: string;
  @Input() tooltipPosition: string;
  tooltipTop: number = 0;
  tooltipLeft: number = 0;

  constructor(private el: ElementRef) {  }

  /* ------------ Events ------------ */
  @HostListener('mouseenter') 
  onMouseEnter() {
    this.tooltipElement = document.getElementById('tooltip');
    
    // Change Tooltip Text.
    this.changeTooltipText();

    //
    this.calculateTooltipPosition(this.getElementRect());

    // Change Tooltip Position.
    this.setTooltipPosition();

    // Show Tooltip.
    this.showTooltip();
  }
  
  @HostListener('mouseleave') 
  onMouseLeave() {
    // Remove added class
    this.tooltipElement.classList.remove('tooltip-' + this.tooltipPosition);
    
    // Hide Tooltip.
    // this.hideTooltip();
  }
  
  /* ------------ Methods ------------ */
  private changeTooltipText() {
    this.tooltipElement.innerText = this.tooltipText;
  }

  private getElementRect(): DOMRect{
    return this.el.nativeElement.getBoundingClientRect();
  }
  
  private calculateTooltipPosition({ top, left, width, height }) {
    // Get tooltip element width & height.
    let tooltipWidth = this.tooltipElement.getBoundingClientRect().width;
    let tooltipHeight = this.tooltipElement.getBoundingClientRect().height;
    
    switch (this.tooltipPosition) {
      case 'top':
          this.setTopCoordinations(top, tooltipHeight, width, tooltipWidth, left);
          if(this.tooltipTop < 0){
            this.removeTooltipArrowClass();
            this.tooltipPosition = 'bottom';
            this.calculateTooltipPosition({ top, left, width, height });
          }
          this.addTooltipArrowClass();
        break;

      case 'bottom':
          this.setBottomCoordinations(top, height, width, tooltipWidth, left);
          let clientHeight = document.documentElement.clientHeight;
          console.log(this.tooltipTop)
          console.log(clientHeight)
          if(this.tooltipTop > clientHeight){
            this.removeTooltipArrowClass();
            this.tooltipPosition = 'top';
            this.calculateTooltipPosition({ top, left, width, height });
          }
          this.addTooltipArrowClass();
        break;

      case 'right':
            this.setRightCoordinations(top, height, width, left, tooltipHeight);
            this.addTooltipArrowClass();
          break;
          
        case 'left':
          this.setLeftCoordinations(top, height, left, tooltipWidth, tooltipHeight);
          this.addTooltipArrowClass();
        break;
    }
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

  private setBottomCoordinations(
    hoveredTop: number, 
    hoveredHeight: number, 
    hoveredWidth: number, 
    tooltipWidth: number, 
    hoveredLeft: number
  ) 
  {
    this.tooltipTop = hoveredTop + hoveredHeight;
    this.tooltipLeft = ((hoveredWidth / 2) - (tooltipWidth / 2)) + (hoveredLeft - 6);
  }

  private setRightCoordinations(
    hoveredTop: number, 
    hoveredHeight: number, 
    hoveredWidth: number, 
    hoveredLeft: number,
    tooltipHeight: number 
  ) 
  {
    this.tooltipTop = ((hoveredTop + (hoveredHeight / 2)) - (tooltipHeight / 2)) - 6;
    this.tooltipLeft = hoveredLeft + hoveredWidth;
  }

  private setLeftCoordinations(
    hoveredTop: number, 
    hoveredHeight: number, 
    hoveredLeft: number,
    tooltipWidth: number,
    tooltipHeight: number
  ) 
  {
    this.tooltipTop = ((hoveredTop + (hoveredHeight / 2)) - (tooltipHeight / 2)) - 6;
    this.tooltipLeft = hoveredLeft - tooltipWidth - 12;
  }

  private addTooltipArrowClass() {
    this.tooltipElement.classList.add('tooltip-' + this.tooltipPosition);
  }
  
  private removeTooltipArrowClass() {
    this.tooltipElement.classList.remove('tooltip-' + this.tooltipPosition);
  }

  private setTooltipPosition(): void{
    this.tooltipElement.style.top = this.tooltipTop + 'px';
    this.tooltipElement.style.left = this.tooltipLeft + 'px';  
  }
  
  private showTooltip(): void{
    this.tooltipElement.style.opacity = '1';
  }
  
  private hideTooltip(): void{
    this.tooltipElement.style.opacity = '0';
  }
}
