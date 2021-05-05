# sway-wu.github.io

1. 用html語法建立基本架構並打上文字
2. import Bootstrap 5 的模板並進行排版
    i.   Horizontal
         <div class="card mb-3" style="max-width: 540px;">
         <div class="row g-0">
           <div class="col-md-4">
             <img src="..." alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">Card title</h5>
               <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
               <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
             </div>
           </div>
         </div>
         </div>
    ii.  Using grid markup
         <div class="row">
         <div class="col-sm-6">
           <div class="card">
             <div class="card-body">
               <h5 class="card-title">Special title treatment</h5>
               <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
             </div>
           </div>
         </div>
         <div class="col-sm-6">
           <div class="card">
             <div class="card-body">
               <h5 class="card-title">Special title treatment</h5>
               <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
             </div>
           </div>
         </div>
         </div>
    iii. Navbar
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
            </div>
          </div>
        </nav>
3. 用css對樣式、字體及排版做微調
