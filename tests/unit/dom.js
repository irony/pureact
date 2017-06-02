var render = require('../../lib/render')
var oboy = require('oboy')

oboy((expect, it, should, sinon) => {
  it('should render a tag with children', (done) => {
    var nav = { tagName: 'nav', children: [] }
    var div = { tagName: 'div', className: 'nav', children: [nav] }
    var node = { appendChild: sinon.spy() }
    render(div, node)
    expect(node.appendChild).to.be.calledOnce
    done()
  })
})
