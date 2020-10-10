import React, { FC, useEffect, useState } from 'react';
import TopCard from './TopCard';
import BodyCard from './BodyCard';
import echarts from 'echarts';
import api from '../api';
import './_index.scss';

const { screenData } = api;

const TopView: FC = () => {
	const [ ReportData, setReportData ] = useState<any>({});
	useEffect(() => {
		let reportData: {
			[x: string]: any;
		} = {};
		let char1 = document.getElementById('char1');
		let char2 = document.getElementById('char2');
		let char3 = document.getElementById('char3');
		async function reportDataFun() {
			await screenData().then((data) => {
				reportData = data;
				setReportData(reportData);
			});
			if (char1) {
				const myChart = echarts.init(char1 as NodeJS.charType);
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
			if (char2) {
				const myChart = echarts.init(char2 as NodeJS.charType);
				myChart.setOption({
					color: [ '#3398DB' ],
					tooltip: {},
					series: [
						{
							name: '用户实时交易量',
							type: 'bar',
							data: reportData.orderUserTrend,
							barWidth: '60%'
						}
					],
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
				});
			}
			if (char3) {
				const myChart: any = echarts.init(char3 as NodeJS.charType);
				myChart.setOption({
					grid: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					},
					xAxis: {
						type: 'value',
						show: false
					},
					yAxis: {
						type: 'category',
						show: false
					},
					series: [
						{
							name: '上月平台用户数',
							type: 'bar',
							stack: '总量',
							data: [ reportData.userLastMonth ],
							barWidth: 10,
							itemStyle: {
								color: '#45c946'
							}
						},
						{
							name: '今日平台用户数',
							type: 'bar',
							stack: '总量',
							data: [ reportData.userToday ],
							itemStyle: {
								color: '#eee'
							}
						},
						{
							type: 'custom',
							stack: '总量',
							data: [ reportData.userLastMonth ],
							renderItem: (
								params: any,
								api: { value: (arg0: number) => any; coord: (arg0: any[]) => any }
							) => {
								const value = api.value(0);
								const endPoint = api.coord([ value, 0 ]);

								return {
									type: 'group',
									position: endPoint,
									children: [
										{
											type: 'path',
											shape: {
												d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
												x: -5,
												y: -20,
												width: 10,
												height: 10,
												layout: 'cover'
											},
											style: {
												fill: '#45c946'
											}
										},
										{
											type: 'path',
											shape: {
												d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
												x: -5,
												y: 10,
												width: 10,
												height: 10,
												layout: 'cover'
											},
											style: {
												fill: '#45c946'
											}
										}
									]
								};
							}
						}
					]
				});
			}
		}
		reportDataFun();
	}, []);
	return (
		<div>
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
				<TopCard>
					<div className="title">累计用户数</div>
					<div className="value">{ReportData.orderToday}</div>
					<div className="char-wrapper" id="char3" />
					<div className="line" />
					<div className="total">
						<p>
							日同比<span className="emphasis">{ReportData.userGrowthLastDay}%</span>
							<i className="rise" />
						</p>
						<p>
							月同比<span className="emphasis">{ReportData.userGrowthLastMonth}%</span>
							<i className="decline" />
						</p>
					</div>
				</TopCard>
			</div>
			<div className="body-wrapper">
				<BodyCard />
			</div>
		</div>
	);
};

export default TopView;
