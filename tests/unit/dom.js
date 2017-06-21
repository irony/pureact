const render = require('../../lib/render')
const oboy = require('oboy')

oboy((expect, sinon) => {
  it('should render a tag with children', (done) => {
    const nav = { tagName: 'nav', children: [] }
    const div = { tagName: 'div', className: 'nav', children: [nav], document: sinon.spy() }
    const node = { tagName: 'img', appendChild: sinon.spy(), children: [] }
    render(div, node)
    expect(node.appendChild).to.be.calledOnce
    done()
  })
})
