import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators'

interface Email {
  id: string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string
}

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email 

  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.email = this.route.snapshot.data.email
    this.route.data.subscribe(({email}) => {
      this.email = email
    })
    console.log( this.route)

   }

  ngOnInit(): void {

    // this.route.params.subscribe(({ id })=> {
    //   console.log(id)
    //   this.emailService.getEmail(id).subscribe((email) => {
    //     console.log(email)
    //   })
    // })
    // this.route.params.pipe(
    //   switchMap(({id}) => {
    //     return this.emailService.getEmail(id)
    //   })
    // ).subscribe(email => {
    //   this.email = email
    // })
  }

}
