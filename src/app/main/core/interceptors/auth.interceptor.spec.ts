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

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header when auth_token exists in localStorage', () => {
    const dummyToken = 'mocked_token';
    localStorage.setItem('auth_token', dummyToken);

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${dummyToken}`
    );
  });

  it('should NOT add Authorization header when no auth_token exists', () => {
    localStorage.removeItem('auth_token');

    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });

  it('should catch and propagate HTTP errors', () => {
    const errorMessage = 'Internal Server Error';

    httpClient.get('/api/error').subscribe({
      next: () => fail('Should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne('/api/error');
    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
