import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private readonly ngxLogger: NGXLogger) {}

  trace(message: any, ...additional: any[]): void {
    this.ngxLogger.trace(message, ...additional);
  }

  debug(message: any, ...additional: any[]): void {
    this.ngxLogger.debug(message, ...additional);
  }

  info(message: any, ...additional: any[]): void {
    this.ngxLogger.info(message, ...additional);
  }

  log(message: any, ...additional: any[]): void {
    this.ngxLogger.log(message, ...additional);
  }

  warn(message: any, ...additional: any[]): void {
    this.ngxLogger.warn(message, ...additional);
  }

  error(message: any, ...additional: any[]): void {
    this.ngxLogger.error(message, ...additional);
  }

  fatal(message: any, ...additional: any[]): void {
    this.ngxLogger.fatal(message, ...additional);
  }
}
