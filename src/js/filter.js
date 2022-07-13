
class Filter {
  constructor (elementId, options) {
    const DEFAULTS = {}
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
      this.options.model.on('changed', this.render.bind(this))
      this.render()
    }
    else {
      console.error(`No element found with id - ${this.elementId}`)
    }
  }
  handleClick (event) {
    console.log(event)
    if (event.target.classList.contains('list-item')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true)
    }
  }
  render () {
    this.options.model.getLayout().then(layout => {
      console.log(layout)
      let html = layout.qListObject.qDataPages[0].qMatrix.map(row => `
      <li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText} - ${row[0].qState}</li>
      `).join('')
      const el = document.getElementById(`${this.elementId}_list`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}
