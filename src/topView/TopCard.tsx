import React,{FC} from 'react'
import './_index.scss'

const Card:FC<NodeJS.CardProps> = (props) => {
    console.log(props)
    const {children} = props
    return <div className="card-style">
        <div className="card-body">
            {children} 
        </div>
    </div>
}


export default Card