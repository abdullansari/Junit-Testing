import { TestBed } from '@angular/core/testing';
import { App } from './app';

// Smoke test supplied with the project. You do not need to change this file.
describe('App', () => {
  it('should create the app', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
