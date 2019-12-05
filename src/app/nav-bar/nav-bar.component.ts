import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', '../app.component.scss']
})
export class NavBarComponent implements OnInit {
  public isLoggedIn;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    console.log(this.isLoggedIn);
  }

  signOut() {
    this.firebaseService.logout();
    sessionStorage.clear();
    this.router.navigate(['/recipes']);
  }
}
