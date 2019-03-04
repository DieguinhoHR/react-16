import { PureComponent } from 'react'

class ErrorBoundary extends PureComponent {
  state = { hasError: true }

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
