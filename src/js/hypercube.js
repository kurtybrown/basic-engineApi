/* global model */
class Hypercube {
  constructor (elementId, options) {
    const DEFAULTS = {}
    this.elementId = elementId
    this.options = Object.assign({}, DEFAULTS, options)
    this.options.model.on('changed', this.render.bind(this))
    const el = document.getElementById(this.elementId)
    el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
    this.render()
  }

  render () {
    this.options.model.getLayout().then(layout => {
      let html = layout.qHyperCube.qDataPages[0].qMatrix.map(row => 
        `<li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText} - ${row[0].qState}</li>`
        // for (let i = 0; i < layout.qHyperCube.qDataPages[0].qMatrix.length; i++) {
        //   console.log('esto es el texto', layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText)
        //   rows = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText
        // for (let j = 0; j < layout.qHyperCube.qDataPages[0].qMatrix[i].length; j++) {
        //   console.log('esto es el texto', layout.qHyperCube.qDataPages[0].qMatrix[i][j].qText)
        // }
        // }
      ).join('')
      console.log(this.elementId)
      const el = document.getElementById(this.elementId)
      el.innerHTML = html
    })
  }
}
