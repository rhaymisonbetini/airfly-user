import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  private tickets: any = [];

  constructor(
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private ticketService: TicketService,
  ) { }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getTickets().subscribe((res: any) => {
      this.tickets = res;
      this.removeOpacity()
    }, error => {
      this.toastProvider.erroToast('Ops! Ocorreu ume erro com sua solicitação')
      console.log(error)
    })
  }

  removeOpacity(){
    document.getElementById('main').classList.add('remove-opacity')
  }

}
