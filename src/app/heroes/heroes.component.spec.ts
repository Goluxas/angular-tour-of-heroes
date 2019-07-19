import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  
  let heroSvcSpy: { 
    getHeroes: jasmine.Spy,
    addHero: jasmine.Spy,
    deleteHero: jasmine.Spy,
  };
  const mockHeroes: Hero[] = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  beforeEach(async(() => {

    heroSvcSpy = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);
    heroSvcSpy.getHeroes.and.returnValue( of(mockHeroes) );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [ HeroesComponent ],
      providers: [
        { provide: HeroService, useValue: heroSvcSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.heroes).toEqual(mockHeroes);
  });
});
