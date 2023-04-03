import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyTableDataSource } from '@angular/material/legacy-table';
import { Subscription } from 'rxjs';
import { ParameterValue } from '../../client';
import { Synchronizer } from '../../core/services/Synchronizer';
import { YamcsService } from '../../core/services/YamcsService';
import { ParameterTableBuffer } from './ParameterTableBuffer';
import { ParameterTable } from './ParameterTableModel';

@Component({
  selector: 'app-scrolling-parameter-table',
  templateUrl: './ScrollingParameterTable.html',
  styleUrls: ['./ScrollingParameterTable.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // FIXME
})
export class ScrollingParameterTable implements OnInit, OnChanges, OnDestroy {

  @Input()
  model: ParameterTable = {
    scroll: true,
    parameters: [],
  };

  @Input()
  buffer: ParameterTableBuffer;

  @Input()
  showActions: boolean;

  @Input()
  paused: boolean;

  @Output()
  removeColumn = new EventEmitter<string>();

  @Output()
  moveLeft = new EventEmitter<number>();

  @Output()
  moveRight = new EventEmitter<number>();

  @Output()
  bufferSize = new EventEmitter<number>();

  dataSource = new MatLegacyTableDataSource<ScrollRecord>([]);

  bufferSizeControl = new UntypedFormControl('10');
  private bufferSizeControlSubscription: Subscription;

  private syncSubscription: Subscription;

  displayedColumns = [
    'generationTime',
    'actions',
  ];

  constructor(readonly yamcs: YamcsService, private changeDetector: ChangeDetectorRef, synchronizer: Synchronizer) {
    this.syncSubscription = synchronizer.syncFast(() => {
      if (!this.paused) {
        this.refreshTable();
      }
    });

    this.bufferSizeControl.valueChanges.subscribe(() => {
      const val = this.bufferSizeControl.value;
      if (val !== String(this.model.bufferSize)) {
        this.bufferSize.emit(parseInt(val, 10));
      }
    });
  }

  ngOnInit() {
    if (this.model.bufferSize) {
      this.buffer.setSize(this.model.bufferSize);
      this.bufferSizeControl.setValue(String(this.model.bufferSize));
    }
    this.refreshTable();
  }

  private refreshTable() {
    const recs: ScrollRecord[] = [];
    const snapshot = this.buffer.snapshot();
    for (const sample of snapshot) {
      const anyValue = this.findAnyMatchingParameterValue(sample);
      if (anyValue) {
        recs.push({
          generationTime: anyValue.generationTime,
          pvals: sample,
        });
      }
    }

    this.dataSource.data = recs;
    this.changeDetector.detectChanges();
  }

  private findAnyMatchingParameterValue(sample: { [key: string]: ParameterValue; }) {
    for (const name in sample) {
      if (sample.hasOwnProperty(name)) {
        if (this.model.parameters.indexOf(name) !== -1) {
          return sample[name];
        }
      }
    }
  }

  ngOnChanges() {
    this.displayedColumns = [
      'generationTime',
      ...this.model.parameters,
      'actions',
    ];
  }

  ngOnDestroy() {
    if (this.syncSubscription) {
      this.syncSubscription.unsubscribe();
    }
    if (this.bufferSizeControlSubscription) {
      this.bufferSizeControlSubscription.unsubscribe();
    }
  }
}

export interface ScrollRecord {
  generationTime: string;
  pvals: { [key: string]: ParameterValue; };
}
