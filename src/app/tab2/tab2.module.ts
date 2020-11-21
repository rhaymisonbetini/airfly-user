import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { TicketService } from '../services/ticket.service';
import { ToastProvider } from '../providers/toast';
import { LoadingProvider } from '../providers/loading';
import { MyModalPageModule } from '../modals/my-modal/my-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    MyModalPageModule
  ],
  declarations: [Tab2Page],
  providers:[
    TicketService,
    ToastProvider,
    LoadingProvider
  ]
})
export class Tab2PageModule {}
