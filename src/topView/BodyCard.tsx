import React, {FC, useState, useEffect} from 'react'
import echarts from 'echarts'
import classNames from 'classnames'
interface BodyCardProps {
    activeIndex?: number
}
const MenuTitle =  ['销售额', '访问量'] 
const BodyCard:FC<BodyCardProps> = props => {
    const {activeIndex} = props
    const [active_index,set_active_index] = useState(activeIndex)
    const selectTile = (e:React.MouseEvent,idx: number) => {
        e.preventDefault()
        set_active_index(idx)
    }
    useEffect(() => {
        let char4 = document.getElementById('char4')
        // const myChart = echarts.init(char4 as charType);
        
    }, [])
    return <div >
        <div className="menu-title">
            {MenuTitle.map((item,idx) => {
               return <p  className={`${idx == active_index ? 'active' : ''}`}  onClick={(e) => selectTile(e,idx)} key={idx}>{item}</p>
            })}
        </div>
        <div className="menu-body">
            <div className="menu-chars">
                <div id="char4"></div>
            </div>
            <div className="menu-leaderboard"></div>
        </div>
    </div>
} 
BodyCard.defaultProps = {
    activeIndex : 0
}
export default BodyCard