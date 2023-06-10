type userProps = {
    name : "kush" | "kushagra",
    userNameList : {
        fname : string
    }[],
    personObj : {
        fname ?: string,
        lName ?: string
    },
    userArray : string []
}
export const Props = (props : userProps) =>{
    const {personObj = {fname :"" , lName : ""}} = props
    return(
        <div>
        {props.userNameList.map(newname=>{
            return(<h1>{newname.fname}</h1>)
        })}
        {personObj.fname} {personObj.lName}
        {props.userArray.map(any =>{
            return(<h1>{any}</h1>)
        })}
        </div>
        )
}