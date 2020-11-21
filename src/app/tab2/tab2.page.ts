import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyModalPage } from '../modals/my-modal/my-modal.page';
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
  public dataReturned:any;

  constructor(
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private ticketService: TicketService,
    private modalController: ModalController,
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

  removeOpacity() {
    document.getElementById('main').classList.add('remove-opacity')
  }

  async openModal(id) {
    const modal = await this.modalController.create({
      component: MyModalPage,
      componentProps: {
        "paramID": id,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

}
