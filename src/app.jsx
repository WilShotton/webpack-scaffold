import _ from 'lodash'
import React from 'react'


export default () => (

    <div className="app">
        Hello world

        <ul>
            {_.fill(Array(3), '').map((item, index) => {
                return <li>{`Item: #${index}`}</li>
            })}
        </ul>

    </div>
)
