import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthStore} from "../../core/services/auth.store";
import {map, pluck, take} from "rxjs";

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnInit {

  // @Input() appRole: any[] = [];

  @Input() set appRole(roles: any[]) {
    this.authStore.user$.pipe(
      take(1),
      pluck('role'),
      map(role => {
        if (roles.includes(role)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          return true;
        }
        this.viewContainer.clear();
        return false;
      })
    ).subscribe();
  }

  constructor(private authStore: AuthStore,private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    // this.authStore.user$.pipe(
    //   take(1),
    //   pluck('role'),
    //   map(role => {
    //     if (this.appRole.includes(role)) {
    //       this.viewContainer.createEmbeddedView(this.templateRef);
    //       return true;
    //     }
    //     this.viewContainer.clear();
    //     return false;
    //   })
    // ).subscribe();

    // this.authStore.user$.pipe(take(1)).subscribe((res)=>{
    //   if(this.appRole.includes(res?.role)) {
    //     console.log('authorized');
    //   } else {
    //     this.elementRef.nativeElement.remove();
    //   }
    // })
  }

}
