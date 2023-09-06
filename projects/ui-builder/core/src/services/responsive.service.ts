import { Injectable, NgZone, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ToolbarItem } from "../models/toolbar-item.model";
import { Breakpoint } from "../models/breakpoint.model";
import { Breakpoints } from "../configs/breakpoints.config";

@Injectable()
export class ResponsiveService implements OnInit, OnDestroy {
    _observer!: ResizeObserver;
    _host: any;
    _responsive$: BehaviorSubject<Breakpoint | null> = new BehaviorSubject<Breakpoint | null>(null);    

    get responsiveAsObs(): Observable<Breakpoint | null> {
        return this._responsive$.asObservable();
    }

    constructor(private zone: NgZone) {}

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this._observer.unobserve(this._host);
    }

    initResponsive(host: any) {
        if(this._observer) {
            this._observer.unobserve(this._host);
        }
        this._host = host;
        this._observer = new ResizeObserver(entries => {
            this.zone.run(() => {
                const width = entries[0].contentRect.width;
                const breakpoint: Breakpoint = Breakpoints.find( f => f.width == null || f.width >= width )!;
                if(breakpoint?.name !== this._responsive$.getValue()?.name) {
                    this._responsive$.next(breakpoint);
                }
            });
        });

        this._observer.observe(this._host);
    }

}