'use client'
const CustomModal = ({ ...props }) => {
    return (
        <div style={{ display: props.open ? 'flex' : 'none' }} onClick={(e) => { e.target.id == 'myModal' && props.onClose() }} id="myModal">
            <div style={{ padding: props.padding || '20px', borderRadius: props.borderRadius || '15px', width: props.width || '30%', height : props?.height }} class="modal-content">
                {props.component}
            </div>
        </div>
    )
}

export default CustomModal;