import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HeroDetailComponent } from './hero-detail.component';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  
  let heroSvcSpy: { getHero: jasmine.Spy, updateHero: jasmine.Spy };
  let locSpy: { back: jasmine.Spy };

  const mockHero: Hero = { id: 1, name: 'A' };

  beforeEach(async(() => {
    heroSvcSpy = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    locSpy = jasmine.createSpyObj('Location', ['back']);

    heroSvcSpy.getHero.and.returnValue( of(mockHero) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: HeroService, useValue: heroSvcSpy },
        { provide: Location, useValue: locSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
