// Minimal and pure DOM manipulation implementation
// Replaces snabbdom with a lightweight alternative

const omit = (o, fields) =>
  Object.keys(o).reduce(
    (a, b) => (!fields.includes(b) ? Object.assign(a, { [b]: o[b] }) : a),
    {},
  )

const shadowRoot = (child) => ({
  tagName: 'span',
  children: child.map(deflate),
})

const deflate = (child) =>
  child
    ? Array.isArray(child)
      ? shadowRoot(child)
      : child.tagName
        ? vtree(child)
        : child
    : ''

function vtree(tree) {
  const props = omit(tree, ['element', 'children', 'style', 'tagName'])
  const children = tree.children && tree.children.map(deflate)
  return {
    tagName: tree.tagName,
    props,
    style: tree.style,
    attrs: props.attrs || (props.properties || {}).attributes,
    children,
  }
}

// Create a real DOM element from a virtual node
function createElement(vnode) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(String(vnode))
  }

  const el = document.createElement(vnode.tagName)

  // Set attributes
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      el.setAttribute(key, vnode.attrs[key])
    })
  }

  // Set properties
  if (vnode.props) {
    Object.keys(vnode.props).forEach((key) => {
      if (key.startsWith('on')) {
        // Event listener (e.g., onclick, onchange)
        const eventName = key.substring(2).toLowerCase()
        el.addEventListener(eventName, vnode.props[key])
      } else if (key === 'className' || key === 'class') {
        // Handle className/class
        el.className = vnode.props[key]
      } else if (key === 'value' || key === 'checked') {
        // Special properties
        el[key] = vnode.props[key]
      } else if (key !== 'attrs' && key !== 'properties') {
        // Other properties
        try {
          el[key] = vnode.props[key]
        } catch (e) {
          // Some properties are read-only, skip them
        }
      }
    })
  }

  // Set styles
  if (vnode.style) {
    Object.keys(vnode.style).forEach((key) => {
      el.style[key] = vnode.style[key]
    })
  }

  // Add children
  if (vnode.children) {
    vnode.children.forEach((child) => {
      el.appendChild(createElement(child))
    })
  }

  return el
}

// Simple diffing and patching
function updateElement(parent, newNode, oldNode, index = 0) {
  // No old node, add the new one
  if (!oldNode) {
    parent.appendChild(createElement(newNode))
    return
  }

  // No new node, remove the old one
  const currentChild = parent.childNodes[index]
  if (!newNode) {
    if (currentChild) {
      parent.removeChild(currentChild)
    }
    return
  }

  // Both are text nodes
  if (typeof newNode === 'string' || typeof newNode === 'number') {
    if (typeof oldNode === 'string' || typeof oldNode === 'number') {
      if (newNode !== oldNode && currentChild) {
        currentChild.textContent = String(newNode)
      }
    } else {
      parent.replaceChild(createElement(newNode), currentChild)
    }
    return
  }

  // Different tag names, replace
  if (
    typeof oldNode === 'string' ||
    typeof oldNode === 'number' ||
    newNode.tagName !== oldNode.tagName
  ) {
    parent.replaceChild(createElement(newNode), currentChild)
    return
  }

  // Same tag, update attributes and properties
  updateAttributes(currentChild, newNode, oldNode)
  updateProperties(currentChild, newNode, oldNode)
  updateStyles(currentChild, newNode, oldNode)

  // Update children
  const newChildren = newNode.children || []
  const oldChildren = oldNode.children || []
  const maxLength = Math.max(newChildren.length, oldChildren.length)

  for (let i = 0; i < maxLength; i++) {
    updateElement(currentChild, newChildren[i], oldChildren[i], i)
  }
}

function updateAttributes(el, newNode, oldNode) {
  const newAttrs = newNode.attrs || {}
  const oldAttrs = oldNode.attrs || {}

  // Remove old attributes
  Object.keys(oldAttrs).forEach((key) => {
    if (!(key in newAttrs)) {
      el.removeAttribute(key)
    }
  })

  // Set new attributes
  Object.keys(newAttrs).forEach((key) => {
    if (newAttrs[key] !== oldAttrs[key]) {
      el.setAttribute(key, newAttrs[key])
    }
  })
}

function updateProperties(el, newNode, oldNode) {
  const newProps = newNode.props || {}
  const oldProps = oldNode.props || {}

  // Remove old event listeners and properties
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        const eventName = key.substring(2).toLowerCase()
        el.removeEventListener(eventName, oldProps[key])
      } else if (key === 'className' || key === 'class') {
        el.className = ''
      } else if (key !== 'attrs' && key !== 'properties') {
        try {
          el[key] = undefined
        } catch (e) {
          // Some properties are read-only
        }
      }
    }
  })

  // Add new properties and event listeners
  Object.keys(newProps).forEach((key) => {
    if (newProps[key] !== oldProps[key]) {
      if (key.startsWith('on')) {
        const eventName = key.substring(2).toLowerCase()
        if (oldProps[key]) {
          el.removeEventListener(eventName, oldProps[key])
        }
        el.addEventListener(eventName, newProps[key])
      } else if (key === 'className' || key === 'class') {
        el.className = newProps[key]
      } else if (key === 'value' || key === 'checked') {
        el[key] = newProps[key]
      } else if (key !== 'attrs' && key !== 'properties') {
        try {
          el[key] = newProps[key]
        } catch (e) {
          // Some properties are read-only
        }
      }
    }
  })
}

function updateStyles(el, newNode, oldNode) {
  const newStyle = newNode.style || {}
  const oldStyle = oldNode.style || {}

  // Remove old styles
  Object.keys(oldStyle).forEach((key) => {
    if (!(key in newStyle)) {
      el.style[key] = ''
    }
  })

  // Set new styles
  Object.keys(newStyle).forEach((key) => {
    if (newStyle[key] !== oldStyle[key]) {
      el.style[key] = newStyle[key]
    }
  })
}

let currentVNode = null

export default function render(tree, node, oldTree) {
  const newVNode = vtree(tree)

  if (oldTree) {
    // We have an old virtual tree, update the existing DOM
    updateElement(node.parentNode || node, newVNode, currentVNode, 0)
  } else {
    // First render, clear the container and add new content
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
    node.appendChild(createElement(newVNode))
  }

  currentVNode = newVNode
  return newVNode
}
