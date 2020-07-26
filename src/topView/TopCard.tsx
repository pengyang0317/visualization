import React,{FC} from 'react'
import './_index.scss'
interface CardProps {
    children: React.ReactNode;
}
const Card:FC<CardProps> = (props) => {
    console.log(props)
    const {children} = props
    return <div className="card-style">
        <div className="card-body">
            {children}
           
        </div>
    </div>
}


export default Card