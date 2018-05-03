import React from 'react'
export default  (WrapCompoent) => {
     class OutCompoent extends WrapCompoent {
        constructor(props) {
            super(props)
            this.isUpdate = true;
        }

        shouldComponentUpdate() {
            return this.isUpdate;
        }

        render() {
            return <WrapCompoent {...this.props} onUpdate={() => { this.isUpdate = true }} onUnUpdate={() => { this.isUpdate = false }} />
        }
    }
    return OutCompoent;
}