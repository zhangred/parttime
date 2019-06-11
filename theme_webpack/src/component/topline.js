import React from 'react'

export default class Link extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render() {
        return (
            <div>
                <p className="logo">EASY</p>
                <p className="left">长文本模版</p>
                <p className="right">测试版本</p>
            </div>
        )
    }
}