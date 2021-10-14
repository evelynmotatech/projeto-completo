import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DepartmentService } from './../department.service';
import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})

export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  depName: string = '';
  depEdit: Department = null;
  depProduct: string;

  private unsubscribe$: Subject<any> = new Subject();
  

  constructor(
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.departments = deps);      
  }

  
  //MÉTODO PARA SALVAR INSERÇÃO DE DADO E/OU ALTERAÇÃO DE DADO  
  save() {
    if (this.depEdit && this.depName.length !== 0 && this.depProduct.length !== 0) {
      this.departmentService.update(
        { name: this.depName, product: this.depProduct, _id: this.depEdit._id })
        .subscribe(
          (dep) => {
            this.notify('Atualizado!');
          },
          (err) => {
            this.notify('Error');
            console.error(err);
          }
        )
    }
    else {
      if (this.depName.length == 0 || this.depProduct.length == 0) {
        this.cancel();
      }
      else {
        this.departmentService.add({ name: this.depName, product: this.depProduct })
          .subscribe(
            (dep) => {
              console.log(dep);

              this.notify('Inserido!');
            },
            (err) => console.error(err))
      }
      this.clearFields();
    }
  }

  //ALTERAR DADOS
  edit(dep: Department) {
    this.depName = dep.name;
    this.depProduct = dep.product;
    this.depEdit = dep;
  }

  //DELETAR DADOS
  delete(dep: Department) {
    this.departmentService.del(dep)
      .subscribe(
        () => this.notify("Deletado!"),
        (err) => this.notify(err.error.msg)
      )
  }

  //LIMPAR CAMPO
  clearFields() {
    this.depName = '';
    this.depProduct = '';
    this.depEdit = null;
  }

  //CANCELAR AÇÃO
  cancel() {
    this.clearFields();
  }

  //NOFICAÇÃO DE STATUS DA AÇÃO
  notify(msg: string) {
    this.snackbar.open(msg, 'Ok', { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

}

