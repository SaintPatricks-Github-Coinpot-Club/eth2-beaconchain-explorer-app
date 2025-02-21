/* 
 *  // Copyright (C) 2020 - 2021 Bitfly GmbH
 *  // Manuel Caspari (manuel@bitfly.at)
 *  // 
 *  // This file is part of Beaconchain Dashboard.
 *  // 
 *  // Beaconchain Dashboard is free software: you can redistribute it and/or modify
 *  // it under the terms of the GNU General Public License as published by
 *  // the Free Software Foundation, either version 3 of the License, or
 *  // (at your option) any later version.
 *  // 
 *  // Beaconchain Dashboard is distributed in the hope that it will be useful,
 *  // but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  // GNU General Public License for more details.
 *  // 
 *  // You should have received a copy of the GNU General Public License
 *  // along with Beaconchain Dashboard.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Toast } from '@capacitor/toast';
import ClientUpdateUtils from '../../utils/ClientUpdateUtils';

@Component({
  selector: 'app-clientupdate',
  templateUrl: './clientupdate.component.html',
  styleUrls: ['./clientupdate.component.scss'],
})
export class ClientupdateComponent implements OnInit {

  @Input() data: any
  version: string = null

  constructor(
    private updateUtils: ClientUpdateUtils
  ) { }

  ngOnInit() { }


  ngOnChanges() {
    if (this.data && this.data.data) {
      this.version = this.data.data.tag_name;
    }
  }

  async openGithub() {
    if (!this.data.data.html_url) return
    await Browser.open({ url: this.data.data.html_url, toolbarColor: "#2f2e42" });
  }

  async dismiss() {
    if (!this.data) return

    this.updateUtils.dismissRelease(this.data)
    this.data = null
    this.version = null

    await Toast.show({
      text: 'Saved your update status.'
    });
  }

}
