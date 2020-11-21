import { Component, OnInit } from '@angular/core';

import "babel-polyfill";
import Ws from '@adonisjs/websocket-client'

const ws = Ws('ws://localhost:3333')


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  private chat
  public photo: string;
  public name: string;
  public email: string;

  constructor() {
    ws.connect()
  }

  ngOnInit() {
    this.chat = ws.subscribe('chat')
    this.chatOnReady()
    this.setVaiables()

  }

  setVaiables() {
    this.photo = sessionStorage.getItem('photo');
    this.name = sessionStorage.getItem('name');
    this.email = sessionStorage.getItem('email');
  }


  //socket functions
  chatOnReady() {
    this.chat.on('ready', () => {
      this.chat.emit('message', 'hello')
    })
  }
  // chat.on('error', (error) => {
  //   console.log(error)
  // })

  // chat.on('message', function (message) {
  //   console.log(message)
  // })

  // chat.on('close', () => {
  // })


}
