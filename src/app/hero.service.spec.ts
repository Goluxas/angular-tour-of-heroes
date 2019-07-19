import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let heroService: HeroService;

  let httpClientSpy: { get: jasmine.Spy };
  let msgSpy: { add: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    msgSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: MessageService, useValue: msgSpy },
      ]
    })
    //heroService = new HeroService(<any> msgSpy, <any> httpClientSpy);
    heroService = TestBed.get(HeroService);
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes: Hero[] = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes),
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

  });
});
