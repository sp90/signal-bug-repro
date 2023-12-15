import { Injectable, signal } from '@angular/core';
import { delay, map, of } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private tableState = signal<{
    displayColumns: string[];
    data: any;
  } | null>(null);

  private tableDataState = signal<any | null>(null);

  tableState$ = this.tableState.asReadonly();
  tableDataState$ = this.tableDataState.asReadonly();

  loadFakeApi() {
    return of(ELEMENT_DATA).pipe(
      delay(1000),
      map(data => {
        this.tableState.set({
          displayColumns: ['position', 'name', 'weight', 'symbol', 'actions'],
          data,
        });

        this.tableDataState.set(data);
      })
    );
  }

  removeRow(rowIndex: number) {
    const data = this.tableDataState$();

    if (data) {
      console.log('before: ', structuredClone(data[rowIndex]));

      (data as any[]).splice(rowIndex, 1);

      console.log('after: ', structuredClone(data[rowIndex]));

      this.tableDataState.set(data);
    }
  }
}
