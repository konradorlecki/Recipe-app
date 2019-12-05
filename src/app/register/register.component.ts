import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../nav-bar/nav-bar.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string;
  public password: string;
  public password2: string;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit() {}

  register() {
    if (this.password === this.password2) {
      this.firebaseService.register(this.email, this.password).then(
        done => {
          console.log(done);
          this.router.navigate(['/recipes']);
        }
      ).catch(err=>alert(err));
    }else {
      alert('Passwords must be identical')
    }
  }
}
