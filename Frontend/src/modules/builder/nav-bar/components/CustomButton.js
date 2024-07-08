'use client'

function CustomButton({ ...props }) {

  return (
    <button
      onClick={props.onClick}
      className={`${props.varient == 'primary' ? 'primary-button' : props.varient == 'secondary' ? 'secondary-button' : props.varient == 'minimal' ? 'minimal-button' : 'primary-button'} ${props.className}`}

    >

      {/* {props.icon ? (
        <>
  
          <div className="d-flex">{props.icon} </div>
          {props.btntext != "" && <div className="ml_6">{props.btntext}</div>}
        </>
      ) : (
        <div> {props.btntext} </div>
      )} */}
      {props.icon ? (
        <>
          {props.btntext !== "" && <div className="mr_6">{props.btntext}</div>}
          <div className="d-flex">{props.icon}</div>
        </>
      ) : (
        <div>{props.btntext}</div>
      )}

    </button>)
}

export default CustomButton