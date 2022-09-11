import { ChangeDetectorRef, Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServiceService } from './api-service.service';
import { Date } from './date';
import { Horario } from './horario';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ngOnInit(): void {
    this.api.datesGet().subscribe((data: any) => {
      this.dataSource = data;
    });
  }

  displayedColumns: string[] = ['name', 'horario', 'planeacion_previa', 'actions'];
  dataSource : MatTableDataSource<Date>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api : ApiServiceService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {data : {name : row.name, horario : row.horario, planeacion_previa : row.planeacion_previa}});

    dialogRef.afterClosed().subscribe(result => {

      result.name = null ? row.name : result.name;

      if (result.horario == 0){
        result.horario = "MANANA";
      }
      else if (result.horario == 1){
        result.horario = "TARDE";
      }
      else if (result.horario == 2){
        result.horario = "NOCHE";
      }
      else if (result.horario == 3){
        result.horario = "No_importa"
      }
      else{
        result.horario = row.horario;
      }

      if (result.planeacion_previa == "true"){
        result.planeacion_previa = true;
      }
      else if (result.planeacion_previa == "false"){
        result.planeacion_previa = false;
      }
      else{
        result.planeacion_previa = row.planeacion_previa;
      }

      this.api.datePut(result, row.id).subscribe((data: any) => {
        this.api.datesGet().subscribe((data: any) => {
          this.dataSource = data;
        });
      });

    });
  }

  deleteRow(row: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.api.dateDelete(row.id).subscribe((data: any) => {
          // update ids
          this.api.datesGet().subscribe((data: any) => {
            this.dataSource = data;
          });
        });
      }
    });
  }
}

@Component({
  selector: 'editDialogComponent',
  templateUrl: 'editDialogComponent.html',
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date,
  ) { }

  save(){
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
  }
}

@Component({
  selector: 'deleteDialogComponent',
  templateUrl: 'deleteDialogComponent.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) { }

  confirm(){
    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close();
  }
}
