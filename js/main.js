'use strict'
init()
function init() {
    createProjects()
    renderProjects(getProjects())
}

function renderProjects(projects) {
    var grid = projects.map((project, idx) => {
        return `   <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="${project.img}" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${project.name}</h4>
      <p class="text-muted">${project.name}</p>
    </div>
  </div>`
    })
    $('.myProj').html(grid.join(''))

    var modals = projects.map((project, idx) => {
        return `  <div class=" portfolio-modal modal fade" id="portfolioModal${idx + 1}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${project.name}</h2>
                <p class="item-intro text-muted">${project.name}.</p>
                <img class="img-fluid d-block mx-auto" src="${project.img}" alt="">
                <p>${project.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${project.publishedAt}</li>
                  <li><a href="${project.url}"><button class="bg-secondary">enter project</button></a></li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    })
    $('.modals').html(modals.join(''))
}

function onSetEmail(val) {
    setEmail(val)
}

function onSetSubject(val) {
    setSubject(val)
}

function onSetMessage(val) {
    setMessage(val)
}

function onGetContact() {
    if (getEmail() === undefined || getSubject() === undefined || getMessage() === undefined) return
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${getEmail()}&su=${getSubject()}&body=${getMessage()}`)
}

