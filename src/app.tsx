import { createRoot } from 'react-dom/client'
import './index.css'

const root = createRoot(document.body.querySelector('#root'))
root.render(
  <div>
    <h1>💖 Hello World!</h1>
    <p>Welcome to Perrito</p>
  </div>,
)
