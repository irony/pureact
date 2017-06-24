const render = require('../../src/render')
const oboy = require('oboy')

oboy((expect, sinon) => {
  xit('should render a tag with children', (done) => {
    const nav = { tagName: 'nav', children: [] }
    const div = { tagName: 'div', className: 'nav', children: [nav]}
    const node = { tagName: 'img', appendChild: sinon.spy(), children: []}
    global.document = {createElement: sinon.stub().returns({ appendChild: sinon.spy(), insertBefore: sinon.spy() }) }
    
    render(div, node)
    expect(node.appendChild).to.be.calledOnce
    done()
  })
})
