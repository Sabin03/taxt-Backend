import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ZoneList } from '../../model/zone-list';
import { Service } from '../../model/service';
import { ZonePrice } from '../../model/zone-price';
import { MatTableDataSource } from '@angular/material/table';
import { WebService } from '../../web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Common } from '../../common';
import { ServicePriceEditComponent } from '../service-price-edit/service-price-edit.component';

@Component({
  selector: 'app-service-price-list',
  templateUrl: './service-price-list.component.html',
  styleUrl: './service-price-list.component.css'
})
export class ServicePriceListComponent {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  zone_id = "";
  service_id = "";
  selectZoneObj: ZoneList = new ZoneList();
  selectServiceObj: Service = new Service();

  zoneArr: Array<ZoneList> = [];
  serviceArr: Array<Service> = [];


  displayedColumns: string[] = ['no', 'zone_name', 'service_name', 'base_charge', 'km_charge', 'min_charge', 'booking_charge', 'minimum_charge', 'minimum_km', 'cancel_charge', 'action']
  listArray: Array<ZonePrice> = [];
  dataSource: MatTableDataSource<ZonePrice> = new MatTableDataSource<ZonePrice>();


  constructor(private webService: WebService, public snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getServiceList();
    this.getList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "ok", {
      duration: 2000,
    });
  }

  

  openDialogEdit(obj: ZonePrice) {
    const dialogRef = this.dialog.open(ServicePriceEditComponent, {
      width: '400px',
      data: obj
    })
    dialogRef.afterClosed().subscribe((updateInfo) => {
      Common.Dlog(updateInfo);
      if (updateInfo) {
        const index = this.listArray.findIndex(item => item.price_id == obj.price_id);
        this.listArray[index] = updateInfo;
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  deleteData(obj: ZonePrice) {
    this.webService.action(Common.svDeleteServicePrice, { "price_id": obj.price_id, "zone_id": obj.zone_id, "service_id": obj.service_id  }, true).then((responseObj: any) => {
      if (responseObj.status == 1) {
        this.listArray = this.listArray.filter(item => item.price_id != obj.price_id);
        this.dataSource = new MatTableDataSource(this.listArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.openSnackBar("service price deleted successfully");
      } else {
        this.openSnackBar(responseObj.message);
      }
    })
  }


  onSelectZone(zObj: ZoneList) {
    this.zone_id = zObj.zone_id.toString();
    this.service_id = '';
    this.selectServiceObj = new Service();
    this.getList();

  }

  onSelectService(sObj: Service) {
    this.service_id = sObj.service_id.toString();
    this.getList();
  }


  getServiceList(){

    
    this.webService.action(Common.svZoneServiceList, {}, true).then((responseObj: any) => {

      Common.Dlog(responseObj);
      if (responseObj.status == 1) {
          this.zoneArr =  responseObj.payload.zone_list;
          this.serviceArr = responseObj.payload.service_list;
      }

    })
  }

  getList() {

    var paraObj: any = {};

    if (this.zone_id != "") {
      paraObj["zone_id"] = this.zone_id;
    }

    if (this.service_id != '') {
      paraObj["service_id"] = this.service_id;
    }


    this.webService.action(Common.svZoneServicePrice, paraObj, true).then((responseObj: any) => {

      Common.Dlog(responseObj);
      if (responseObj.status == 1) {
        this.listArray = responseObj.payload;
      } else {
        this.listArray = [];
        this.openSnackBar(responseObj.message);
      }

      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
}
