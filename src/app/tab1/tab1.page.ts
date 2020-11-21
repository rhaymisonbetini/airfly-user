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



  constructor() {
    ws.connect()
  }

  ngOnInit() {
    const chat = ws.subscribe('chat')

    chat.on('ready', () => {
      chat.emit('message', 'hello')
    })

    chat.on('error', (error) => {
      console.log(error)
    })

    chat.on('message', function (message) {
      console.log(message)
    })

    chat.on('close', () => {
    })

  }

}
