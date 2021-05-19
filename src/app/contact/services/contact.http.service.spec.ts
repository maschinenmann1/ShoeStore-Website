import { TestBed } from '@angular/core/testing';

import { Contact.HttpService } from './contact.http.service';

describe('Contact.HttpService', () => {
  let service: Contact.HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contact.HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
