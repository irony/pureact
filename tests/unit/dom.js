const render = require('../../lib/render')
const oboy = require('oboy')

oboy((expect, sinon) => {
  it('should render a tag with children', (done) => {
    const nav = { tagName: 'nav', children: [] }
    const div = { tagName: 'div', className: 'nav', children: [nav] }
    const node = { appendChild: sinon.spy(), children: [] }
    render(div, node)
    expect(node.appendChild).to.be.calledOnce
    done()
  })
})
