import { Component, Input, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { IonicModule, MenuController  } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline  } from "ionicons/icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent  implements OnInit {

  @Input() appName: string = 'Visual Óptica Plus';
  @Input() showProfile: boolean = true;

  userActual : any = null;

  constructor(private menuController: MenuController, public functionService: FunctionService) { addIcons({ cartOutline, menuOutline }); }

  ngOnInit() {
    this.userActual = this.functionService.getUserActual();
  }
  
  toggleMenu() {
    this.menuController.toggle();
  }
}
