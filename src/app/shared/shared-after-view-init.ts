import { AfterViewInit, Component } from "@angular/core";

@Component({
    template: ``,
})
export class SharedAfterViewInit implements AfterViewInit { 

  ngAfterViewInit(): void {  
    // Let styles apply, then force a resize for measurement-based components  
    setTimeout(() => {
      // Force a reflow/resize event  
      window.dispatchEvent(new Event('resize'));  
    }, 0);  
  }

}