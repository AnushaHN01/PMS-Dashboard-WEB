import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpRequest,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LocalStorageKey } from '../models/enums';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header when token is present', () => {
    const token = 'fake-jwt-token';
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === LocalStorageKey.AuthToken) return token;
      return null;
    });

    httpClient.get('/test-url').subscribe();

    const httpRequest = httpMock.expectOne('/test-url');

    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      `Bearer ${token}`
    );

    httpRequest.flush({}); // respond with empty body
  });

  it('should NOT add Authorization header when token is absent', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    httpClient.get('/test-url').subscribe();

    const httpRequest = httpMock.expectOne('/test-url');

    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();

    httpRequest.flush({});
  });

  it('should handle and rethrow HTTP errors', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const consoleSpy = spyOn(console, 'error');

    httpClient.get('/test-url').subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const httpRequest = httpMock.expectOne('/test-url');

    httpRequest.flush('Internal Server Error', {
      status: 500,
      statusText: 'Error',
    });

    expect(consoleSpy).toHaveBeenCalled();
  });
});
