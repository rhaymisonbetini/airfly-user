import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public photo: string = sessionStorage.getItem('photo');
  public name: string = sessionStorage.getItem('name');
  public email: string = sessionStorage.getItem('email');
  public background: string = '../assets/img/index.jpg'

  public tots: any = [];

  constructor(
    private ticketService: TicketService
  ) {
  }

  ngOnInit() {

    this.ticketService.countTyTickets().subscribe((res: any) => {
      this.tots = res;
      console.log(res)
    }, error => {
      alert(JSON.stringify(error))
    })

    setTimeout(() => {
      document.getElementById('profile').classList.add('remove-opacity')
    }, 500)
  }


}
