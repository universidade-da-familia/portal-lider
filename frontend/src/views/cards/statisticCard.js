import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";

import * as Icon from "react-feather";

import { StaticCardData } from "./staticCardData";

import MinimalStatistics from "../../components/cards/minimalStatisticsCard";
import MinimalStatisticsBG from "../../components/cards/minimalStatisticsBGCard";
import MinimalStatisticsChart from "../../components/cards/minimalStatisticsWithChartCard";
import MinimalStatisticsChart2 from "../../components/cards/minimalStatisticsWithChart2Card";
import FitnessStatisticsChart from "../../components/cards/fitnessStatisticsWithChartCard";

class StatisticCards extends Component {
   render() {
      return (
         <Fragment>
            <h4 className="mt-4 mb-0 text-bold-400">Minimal Statistics With Chart & Gredient Background Color</h4>
            <p className="mb-0">Statistics on minimal cards with chart and gradient background color.</p>

            <Row className="row-eq-height">
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-blackberry"
                     statistics="$2156"
                     text="Total Tax"
                     iconSide="right"
                  >
                     <Icon.PieChart size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-ibiza-sunset"
                     statistics="$1567"
                     text="Total Earning"
                     iconSide="right"
                  >
                     <Icon.Box size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-green-teal"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="right"
                  >
                     <Icon.Filter size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="6" xl="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-pomegranate"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="right"
                  >
                     <Icon.DollarSign size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
            </Row>
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-pomegranate"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="left"
                  >
                     <Icon.DollarSign size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-green-teal"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="left"
                  >
                     <Icon.Filter size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-ibiza-sunset"
                     statistics="$1567"
                     text="Total Earning"
                     iconSide="left"
                  >
                     <Icon.Box size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart
                     chartData={StaticCardData.ChartistData}
                     cardBgColor="gradient-blackberry"
                     statistics="$2156"
                     text="Total Tax"
                     iconSide="right"
                  >
                     <Icon.PieChart size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Minimal Statistics With Chart & Background Color</h4>
            <p className="mb-0">Statistics on minimal cards with chart and background color.</p>
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-danger"
                     statistics="$2156"
                     text="Total Tax"
                     iconSide="right"
                  >
                     <Icon.PieChart size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-success"
                     statistics="$1567"
                     text="Total Earning"
                     iconSide="right"
                  >
                     <Icon.Box size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-warning"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="right"
                  >
                     <Icon.Filter size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-info"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="right"
                  >
                     <Icon.DollarSign size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
            </Row>
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-info"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="left"
                  >
                     <Icon.DollarSign size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-warning"
                     statistics="$4566"
                     text="Total Sales"
                     iconSide="left"
                  >
                     <Icon.Filter size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-success"
                     statistics="$1567"
                     text="Total Earning"
                     iconSide="left"
                  >
                     <Icon.Box size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsChart2
                     chartData={StaticCardData.ChartistData2}
                     cardBgColor="bg-danger"
                     statistics="$2156"
                     text="Total Tax"
                     iconSide="left"
                  >
                     <Icon.PieChart size={36} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsChart2>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Minimal Statistics Cards</h4>
            <p className="mb-0">Statistics on minimal cards.</p>

            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="278" statisticsColor="danger" text="New Projects" iconSide="right">
                     <Icon.Briefcase size={56} strokeWidth="1.3" className="danger" />
                  </MinimalStatistics>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="156" statisticsColor="success" text="New Clients" iconSide="right">
                     <Icon.User size={56} strokeWidth="1.3" className="success" />
                  </MinimalStatistics>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="64.89 %" statisticsColor="warning" text="Conversion Rate" iconSide="right">
                     <Icon.PieChart size={56} strokeWidth="1.3" className="warning" />
                  </MinimalStatistics>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="423" statisticsColor="primary" text="Support Tickets" iconSide="right">
                     <Icon.LifeBuoy size={56} strokeWidth="1.3" className="primary" />
                  </MinimalStatistics>
               </Col>
            </Row>
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="278" statisticsColor="primary" text="New Posts" iconSide="left">
                     <Icon.BookOpen size={56} strokeWidth="1.3" className="primary" />
                  </MinimalStatistics>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="156" statisticsColor="warning" text="New Comments" iconSide="left">
                     <Icon.MessageSquare size={56} strokeWidth="1.3" className="warning" />
                  </MinimalStatistics>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="64.89 %" statisticsColor="success" text="Bounce Rate" iconSide="left">
                     <Icon.TrendingUp size={56} strokeWidth="1.3" className="success" />
                  </MinimalStatistics>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatistics statistics="423" statisticsColor="danger" text="Support Tickets" iconSide="left">
                     <Icon.BarChart2 size={56} strokeWidth="1.3" className="danger" />
                  </MinimalStatistics>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Minimal Statistics With Background Color</h4>
            <p className="mb-0">Statistics on minimal cards with background color.</p>

            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-warning" statistics="278" text="New Projects" iconSide="right">
                     <Icon.Briefcase size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-success" statistics="156" text="New Clients" iconSide="right">
                     <Icon.User size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-danger" statistics="64.89 %" text="Conversion Rate" iconSide="right">
                     <Icon.PieChart size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-primary" statistics="423" text="Support Tickets" iconSide="right">
                     <Icon.LifeBuoy size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
            </Row>
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-primary" statistics="278" text="New Posts" iconSide="left">
                     <Icon.BookOpen size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-danger" statistics="156" text="New Comments" iconSide="left">
                     <Icon.MessageSquare size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-success" statistics="64.89 %" text="Bounce Rate" iconSide="left">
                     <Icon.TrendingUp size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG cardBgColor="bg-warning" statistics="423" text="Support Tickets" iconSide="left">
                     <Icon.BarChart2 size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Minimal Statistics With Gradient Background Color</h4>
            <p className="mb-0">Statistics on minimal cards with background color.</p>

            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-blackberry"
                     statistics="278"
                     text="New Projects"
                     iconSide="right"
                  >
                     <Icon.Briefcase size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-ibiza-sunset"
                     statistics="156"
                     text="New Clients"
                     iconSide="right"
                  >
                     <Icon.User size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-green-teal"
                     statistics="64.89 %"
                     text="Conversion Rate"
                     iconSide="right"
                  >
                     <Icon.PieChart size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-pomegranate"
                     statistics="423"
                     text="Support Tickets"
                     iconSide="right"
                  >
                     <Icon.LifeBuoy size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
            </Row>
            <Row className="row-eq-height">
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-pomegranate"
                     statistics="423"
                     text="Support Tickets"
                     iconSide="left"
                  >
                     <Icon.LifeBuoy size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-green-teal"
                     statistics="64.89 %"
                     text="Conversion Rate"
                     iconSide="left"
                  >
                     <Icon.PieChart size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-ibiza-sunset"
                     statistics="156"
                     text="New Clients"
                     iconSide="left"
                  >
                     <Icon.User size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
               <Col sm="12" md="3">
                  <MinimalStatisticsBG
                     cardBgColor="gradient-blackberry"
                     statistics="278"
                     text="New Projects"
                     iconSide="left"
                  >
                     <Icon.Briefcase size={56} strokeWidth="1.3" color="#fff" />
                  </MinimalStatisticsBG>
               </Col>
            </Row>

            <h4 className="mt-4 mb-0 text-bold-400">Fitness card with dount chart</h4>
            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <FitnessStatisticsChart
                     donutChartData={StaticCardData.DonutChartData1}
                     dountChartClass="donut1"
                     textTop="Steps"
                     statisticsTop="3261"
                     textBottom="Steps Today's Target"
                     statisticsBottom="5000"
                     textColor="primary"
                  />
                  <Icon.TrendingUp size={60} strokeWidth="1" className="primary icon-dount-center" />
               </Col>
               <Col sm="12" md="4">
                  <FitnessStatisticsChart
                     donutChartData={StaticCardData.DonutChartData2}
                     dountChartClass="donut2"
                     textTop="Distance"
                     statisticsTop="7.6"
                     statisticsTopUnit="miles"
                     textBottom="Miles Today's Target"
                     statisticsBottom="10"
                     textColor="warning"
                  />
                  <Icon.Zap size={60} strokeWidth="1" className="warning icon-dount-center" />
               </Col>
               <Col sm="12" md="4">
                  <FitnessStatisticsChart
                     donutChartData={StaticCardData.DonutChartData3}
                     dountChartClass="donut3"
                     textTop="Calories"
                     statisticsTop="4,025"
                     statisticsTopUnit="kcal"
                     textBottom="kcla Today's Target"
                     statisticsBottom="5000"
                     textColor="danger"
                  />
                  <Icon.Heart size={60} strokeWidth="1" className="danger icon-dount-center" />
               </Col>
            </Row>
         </Fragment>
      );
   }
}
export default StatisticCards;
