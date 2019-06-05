import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedbPage } from './moviedb.page';

describe('MoviedbPage', () => {
  let component: MoviedbPage;
  let fixture: ComponentFixture<MoviedbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviedbPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
