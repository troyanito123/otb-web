import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouteReuseStrategy } from '@angular/router'
import { CustomRouteReuseStrategy } from 'src/app/app-custom-route-reuse.strategy'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(private routeReouseStragegy: RouteReuseStrategy) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    const strategy = this.routeReouseStragegy as CustomRouteReuseStrategy
    strategy.deleteStoredRoute('/private/users/list')
  }
}
