import React, { FC, useEffect,useState } from 'react';
import TopCard from './TopCard';
import echarts from 'echarts';
import api from '../api';
import './_index.scss';

const { screenData } = api;
type charType = HTMLDivElement | HTMLCanvasElement;

const TopView: FC = () => {
    const [ReportData, setReportData] = useState<any>({})
	useEffect(() => {
		let reportData: {
            [x:string] : any
        } = {};
        let char1 = document.getElementById('char1');
        let char2 = document.getElementById('char2')
		async function reportDataFun() {
			await screenData().then((data) => {
                reportData = data;
                setReportData(reportData)
				if (char1) {
                    const  myChart = echarts.init(char1 as charType);
					myChart.setOption({
						xAxis: {
							type: 'category',
							show: false,
							boundaryGap: false
						},
						yAxis: {
							show: false
						},
						series: [
							{
								type: 'line',
								data: reportData.orderTrend,
								areaStyle: {
									color: 'purple'
								},
								lineStyle: {
									width: 0
								},
								itemStyle: {
									opacity: 0
								},
								smooth: true
							}
						],
						grid: {
							top: 0,
							bottom: 0,
							left: 0,
							right: 0
						}
					});
				}
            });
            if(char2) {
                const myChart = echarts.init(char2 as charType)
                myChart.setOption({
                    color: ['#3398DB'],
                    tooltip: {},
                    series: [{
                      name: '用户实时交易量',
                      type: 'bar',
                      data: reportData.orderUserTrend,
                      barWidth: '60%'
                    }],
                    xAxis: {
                      type: 'category',
                      data: reportData.orderUserTrendAxis,
                      show: false
                    },
                    yAxis: {
                      show: false
                    },
                    grid: {
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0
                    }
                })
            }
		}
		reportDataFun();
	}, []);
	return (
		<div className="topview-style">
			<TopCard>
				<div className="title">累计销售额</div>
				<div className="value">¥ 40,709,578</div>
				<div className="char-wrapper">
					<div>
						日同比：<span>35.70%</span> <i className="rise" />
					</div>
					<div>
						月同比：<span>75.47%</span> <i className="decline" />
					</div>
				</div>
				<div className="line" />
				<div className="total">
					昨日销售额
					<span className="emphasis">¥ 30,000,000</span>
				</div>
			</TopCard>
			<TopCard>
				<div className="title">累计订单量</div>
				<div className="value">2,606,149</div>
				<div className="char-wrapper" id="char1" />
				<div className="line" />
				<div className="total">
					昨日订单量
					<span className="emphasis">2,000,000</span>
				</div>
			</TopCard>
			<TopCard>
            <div className="title">今日交易用户数</div>
                <div className="value">{ReportData.orderToday}</div>
				<div className="char-wrapper" id="char2" />
				<div className="line" />
				<div className="total">
					退货率
					<span className="emphasis">退货率 5.54%</span>
				</div>
            </TopCard>
        {/* <TopCard/> */}
		</div>
	);
};

export default TopView;
