const render = require('../../src/render')

xtest('should render a tag with children', (done) => {
  const appendChild = jest.fn()
  const insertBefore = jest.fn()

  const nav = { tagName: 'nav', children: [] }
  const div = { tagName: 'div', className: 'nav', children: [nav]}
  const node = { tagName: 'img', appendChild, children: []}
  window.document = global.document = { createElement: jest.fn(() => ({ appendChild, insertBefore })) }
  
  render(div, node)
  expect(node.appendChild).to.be.calledOnce
  done()
})
