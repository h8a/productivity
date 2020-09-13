import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private router: Router ) {
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit(): void {
  }

}
