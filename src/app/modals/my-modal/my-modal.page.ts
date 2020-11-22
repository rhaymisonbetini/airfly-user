import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import QRCode from 'qrcode';

import { ToastProvider } from 'src/app/providers/toast';
import { TicketService } from 'src/app/services/ticket.service';

import "babel-polyfill";
import Ws from '@adonisjs/websocket-client'

const ws = Ws('ws://localhost:3333')

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {

  public modalTitle: string;
  public modelId: number;
  public ticket: any;

  public background: string = '../../assets/img/qr.jpg'
  public consumed: Boolean = false;

  public generated = '';
  public spinner: Boolean = true;

  private chat: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private ticketService: TicketService,
    private toastProvide: ToastProvider,
  ) {
    ws.connect()
  }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.getTicket(this.modelId)

  }

  ionViewWillEnter() {

    this.chat = ws.subscribe('chat')
    this.chatOnReady()

    this.chat.on('message', function (message) {
      if (message == 'used') {
        setTimeout(() => {
          document.getElementById('not-consumed').classList.add('set-opacity');
          document.getElementById('consumed').classList.add('remove-opacity');

          setTimeout(() => {
            document.getElementById('consumed').classList.remove('remove-opacity');
            document.getElementById('crap').classList.add('flip-efect');

          }, 1000)
          setTimeout(() => {
            document.getElementById('crap').classList.add('set-opacity-crap');
          }, 1500)

        }, 5000)
      }
    })
  }

  //socket functions
  chatOnReady() {
    this.chat.on('ready', () => {
      this.chat.emit('message', 'user-loged')
    })
  }

  getTicket(id) {
    this.ticketService.getTicketById(id).subscribe((res: any) => {
      this.ticket = res;
      this.process(res.codigo)

    }, error => {
      console.log(error)
      this.toastProvide.erroToast('Ops! Ocorreu um erro com sua solicitação.')
    })
  }

  process(code) {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(code, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
      self.spinner = false;
    })
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
