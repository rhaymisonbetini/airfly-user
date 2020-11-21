import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ToastProvider } from 'src/app/providers/toast';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {

  modalTitle: string;
  modelId: number;

  ticket: any;

  background: string = '../../assets/img/qr.jpg'

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private ticketService: TicketService,
    private toastProvide: ToastProvider
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.getTicket(this.modelId)
  }

  getTicket(id) {
    this.ticketService.getTicketById(id).subscribe((res: any) => {

      this.ticket = res;
      console.log(res);

    }, error => {
      console.log(error)
      this.toastProvide.erroToast('Ops! Ocorreu um erro com sua solicitação.')
    })
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
