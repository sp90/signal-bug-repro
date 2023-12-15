import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StateService } from './state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private stateService = inject(StateService);
  dataSource = new MatTableDataSource([]);

  tableState$ = this.stateService.tableState$;

  displayedColumns$ = computed(() => {
    const res = this.tableState$();

    console.log('res1', res);

    this.dataSource.data = res?.data ?? [];

    return res?.displayColumns ?? [];
  });

  constructor() {
    effect(() => {
      const res = this.stateService.tableDataState$();

      console.log('res2', res);
    });
  }

  ngOnInit() {
    this.stateService.loadFakeApi().subscribe();
  }

  removeRow(rowIndex: number) {
    console.log(rowIndex);

    this.stateService.removeRow(rowIndex);
  }
}
