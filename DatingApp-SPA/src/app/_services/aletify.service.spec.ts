/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AletifyService } from './aletify.service';

describe('Service: Aletify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AletifyService]
    });
  });

  it('should ...', inject([AletifyService], (service: AletifyService) => {
    expect(service).toBeTruthy();
  }));
});
