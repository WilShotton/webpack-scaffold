import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import App from '../src/app'


storiesOf('App', module).add('Basic', () => <App />)
