import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let heroService: HeroService;
  let httpTestingController: HttpTestingController;

  let msgSpy: { add: jasmine.Spy };

  // Test values
  const test_hero: Hero = { id: 1, name: 'A' };
  const test_heroes: Hero[] = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ];

  beforeEach(() => {
    msgSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: msgSpy },
      ]
    })
    heroService = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  it('getHeroes should return array of expected heroes', () => {
    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(test_heroes),
      fail
    );

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    
    // this sends back the mock data and triggers the above subscribe to resolve
    req.flush(test_heroes);

    // makes sure there's no other requests
    httpTestingController.verify();
  });

  it('getHero should return selected hero', () => {
    heroService.getHero(1).subscribe(
      hero => expect(hero).toEqual(test_hero),
      fail
    );

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');

    req.flush(test_hero);

    httpTestingController.verify();
  });

  it('updateHero should put the passed hero', () => {
    heroService.updateHero(test_hero).subscribe(
      _ => {},
      fail
    );

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(test_hero);

    req.flush('', {status: 200, statusText: 'OK'});
    httpTestingController.verify();
  });

  it('addHero should post a new hero object', () => {
    heroService.addHero(test_hero).subscribe(
      _ => {},
      fail
    );

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(test_hero);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush('', {status:200, statusText: 'OK'});
    httpTestingController.verify();
  });

  it('deleteHero should delete the hero with matching id', () => {
    heroService.deleteHero(1).subscribe(
      _ => {},
      fail
    );

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toBe('DELETE');
    
    req.flush('', {status: 200, statusText: 'OK'});
    httpTestingController.verify();
  });

  it('deleteHero should delete the passed hero', () => {
    heroService.deleteHero(test_hero).subscribe(
      _ => {},
      fail
    );

    const req = httpTestingController.expectOne('api/heroes/1');
    expect(req.request.method).toBe('DELETE');

    req.flush('', {status: 200, statusText: 'OK'});
    httpTestingController.verify();
  });

  it('searchHeroes should return all heroes with matching names', () => {
    /* Actual searching occurs on the backend, so just make sure this
     * handles the passthrough of the matched array
     */
    const expMatches: Hero[] = [
      {id: 1, name: "Magneta"},
      {id: 2, name: "Repoman"},
    ];

    heroService.searchHeroes('Ma').subscribe(
      heroes => expect(heroes).toBe(expMatches),
      fail
    );

    const req = httpTestingController.expectOne('api/heroes/?name=Ma');
    expect(req.request.method).toBe('GET');

    req.flush(expMatches);
    httpTestingController.verify();
  });

  it('searchHeroes should return an empty array if no term is given', () => {
    heroService.searchHeroes(' ').subscribe(
      heroes => expect(heroes).toEqual([]),
      fail
    );

    // this ensures that no http requests were made
    httpTestingController.verify();
  });
});
