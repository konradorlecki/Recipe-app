import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../register/register.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.firebaseService.login(this.email, this.password)
      .then(work => console.log(work))
      .catch(err => console.log(err));
  }
}
