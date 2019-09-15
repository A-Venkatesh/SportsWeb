import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatSidenavModule,
    MatPaginatorModule
  ]
})

export class MaterialModule {}