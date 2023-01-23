import {Directive, ElementRef, Input} from '@angular/core';
import {AuthStore} from "../../core/services/auth.store";
import {map, pluck, take} from "rxjs";

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {

  @Input() appRole: any[] = [];

  constructor(private authStore: AuthStore, private elementRef: ElementRef) { }

  ngOnInit() {
    this.authStore.user$.pipe(
      take(1),
      pluck('role'),
      map(role => {
        if (this.appRole.includes(role)) {
          return true;
        }
        this.elementRef.nativeElement.remove();
        return false;
      })
    ).subscribe();

    // this.authStore.user$.pipe(take(1)).subscribe((res)=>{
    //   if(this.appRole.includes(res?.role)) {
    //     console.log('authorized');
    //   } else {
    //     this.elementRef.nativeElement.remove();
    //   }
    // })
  }

}
