import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroSearchComponent } from './hero-search.component';

import { HeroService } from '../hero.service';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroSvcSpy: { searchHeroes: jasmine.Spy };

  beforeEach(async(() => {
    const heroSvcSpy = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [ HeroSearchComponent ],
      providers: [
        { provide: HeroService, useValue: heroSvcSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
