class Router {
  constructor(routes) {
    this.routes = routes
    this._loadInitialRoute()
  }

  loadRoute(...urlSegments) {
    const matchedRoute = this._matchUrlToRoute(urlSegments)

    const url = `/${urlSegments.join('/')}`
    history.pushState({}, 'this works', url)

    const container = document.querySelector('.data-router')
    container.innerHTML = matchedRoute.template
  }

  _matchUrlToRoute(urlSegments) {
    const matchedRoute = this.routes.find(route => {
      const routePathSegments = route.path.split('/').slice(1)

      if (routePathSegments.length !== urlSegments.length) {
        return false
      }

      return routePathSegments
        .every((routePathSegment, i) => routePathSegment === urlSegments[i]) 
        //como una compuerta AND (regresa 1 solo si todos son 1)
    })

    return matchedRoute
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/')
    const pathSegments = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : ''

    this.loadRoute(...pathSegments)
  }
}