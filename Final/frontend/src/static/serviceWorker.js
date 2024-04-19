function log(...data) {
    console.log("SWv1.0", ...data);
  }
  
  log("SW Script executing - adding event listeners");
  
  
  const STATIC_CACHE_NAME = 'nutritrack-static-v0';
  
  self.addEventListener('install', event => {
    log('install', event);
    event.waitUntil(
      caches.open(STATIC_CACHE_NAME).then(cache => {
        return cache.addAll([
        //   '/offline', Need to add offline page
          //CSS
          '/css/addRecipe.css',
          '/css/dashboard.css',
          '/css/login.css',
          '/css/profile.css',
          '/css/registration.css',
          '/css/styles.css',
          //Images

          //Scripts
          '/js/API_Client_Mock.js',
          '/js/addRecipe.js',
          '/js/common.js',
          '/js/HTTPClient.js',
          '/js/login.js',
          '/js/home.js',
          '/js/registration.js',
          '/js/profile.js',
          '/js/dashboard.js',
          //External Resources
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js'
        ]);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    log('activate', event);
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('nutritrack-') && cacheName != STATIC_CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
  
  self.addEventListener('fetch', event => {
    var requestUrl = new URL(event.request.url);
    //Treat API calls (to our API) differently
    if(requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/api')) {
      //If we are here, we are intercepting a call to our API
      if(event.request.method === "GET") {
        //Only intercept (and cache) GET API requests
        event.respondWith(
          // cacheFirst(event.request)
          networkFirst(event.request)
        );
      }
    }
    else {
      //If we are here, this was not a call to our API
      event.respondWith(
        // cacheFirst(event.request)
        networkFirst(event.request)
      );
    }
  
  });
  
  
  // function cacheFirst(request) {
  //   return caches.match(request)
  //   .then(response => {
  //     //Return a response if we have one cached. Otherwise, get from the network
  //     return response || fetchAndCache(request);
  //   })
  //   .catch(error => {
  //     return caches.match('/offline');
  //   })
  // }
  
  function networkFirst(request) {
    return fetchAndCache(request)
    .catch(error => {
      //If we get an error, try to return from cache
      return caches.match(request);
    })
    .catch(error => {
      return caches.match('/offline');
    })
  }
  
  function fetchAndCache(request) {
    return fetch(request).then(response => {
      var requestUrl = new URL(request.url);
      //Cache successful GET requests that are not browser extensions
      if(response.ok && request.method === "GET" && !requestUrl.protocol.startsWith('chrome-extension')) {
        caches.open(STATIC_CACHE_NAME).then((cache) => {
          cache.put(request, response);
        });
      }
      return response.clone();
    });
  }
  
  
  
  self.addEventListener('message', event => {
    log('message', event.data);
    if(event.data.action === 'skipWaiting') {
      self.skipWaiting();
    }
  });