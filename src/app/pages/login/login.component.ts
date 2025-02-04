import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": "",
    "password": ""
  }

  http = inject(HttpClient)
  router = inject(Router)

  onLogin() {
    this.http.post('http://localhost:9500/api/v1/auth/login', this.loginObj).subscribe((res: any) => {
      console.log(res)
      if (res.status == "success") {
        alert(res.message)
        localStorage.setItem('user', JSON.stringify(res.data))
        this.router.navigate(['/dashboard'])
      }
    })
  }

}
