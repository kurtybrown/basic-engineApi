/* global enigma schema Filter Hypercube def def2 include */
include('./definitions.js')
include('./filter.js')
include('./hypercube.js')

const config = {
  schema: window.schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
}

const session = enigma.create(config)

session.open().then(global => {
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(app => {
    app.createSessionObject(def).then(model => {
      console.log('this is model', model)

      model.getLayout().then(layout => {
        console.log('LAYOUT', layout)

        const f = new Filter('filter1', { model })
      })
    })

    app.createSessionObject(def2).then(model => {
      const h = new Hypercube('hypercube1', { model })

      // const pageDefs = [{
      //   qTop: 50,
      //   qLeft: 0,
      //   qWidth: 2,
      //   qHeight: 50
      // }]
      // model.getHyperCubeData('/qHyperCubeDef', pageDefs).then(pages => {
      //   console.log('pages', pages)
      // })
    }) 
  })
})
