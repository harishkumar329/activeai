/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestmappingComponent } from './testmapping.component';

describe('TestmappingComponent', () => {
  let component: TestmappingComponent;
  let fixture: ComponentFixture<TestmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
