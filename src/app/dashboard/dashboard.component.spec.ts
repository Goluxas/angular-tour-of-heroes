import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({selector: 'app-hero-search', template: ''})
class HeroSearchStubComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let heroSvcSpy: { getHeroes: jasmine.Spy };

  beforeEach(async(() => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    heroSvcSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    heroSvcSpy.getHeroes.and.returnValue( of(mockHeroes) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        DashboardComponent,
        HeroSearchStubComponent,
      ],
      providers: [
        { provide: HeroService, useValue: heroSvcSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
