import { PureComponent } from 'react'
import t from 'prop-types'

class ErrorBoundary extends PureComponent {
  state = { hasError: true }

  static propTypes = {
    children: t.func.isRequired
  };

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error, info) {
    console.log('error:', error)
    console.log('info:', info.componentStack)
  }

  render () {
    const { hasError } = this.state

    return this.props.children(hasError)
  }
}

export default ErrorBoundary
