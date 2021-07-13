import { Router, ActivatedRoute } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { from, Observable, Subject } from 'rxjs';

class RouterStub {
  navigate(params: string) {}
}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value: any) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
  // params: Observable<any> = from([]);
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserDetailsComponent],
        providers: [
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the users page after save', () => {
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate the user to the not found page when invalid user id is passed', () => {
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');

    // https://stackoverflow.com/questions/44099253/angular-testing-stubs-and-typescript
    let route: ActivatedRouteStub = TestBed.inject(ActivatedRoute) as any;
    route.push({ id: 0 });

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
