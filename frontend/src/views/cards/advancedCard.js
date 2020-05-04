import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";

import { AdvancedCardData } from "./advancedCardData";

import ProductsSalesChartCard from "../../components/cards/productsSalesChartCard";

import VisitSalesStatisticsCard from "../../components/cards/visitSalesStatistics";
import WeeklyStatisticsLineChartCard from "../../components/cards/weeklyStatisticsLineChartCard";

import DiscoverPeopleListCard from "../../components/cards/discoverPeopleListCard";
import SalesAnalysisChartCarda from "../../components/cards/salesAnalysisChartCard";

import SalesPerVisitChartCard from "../../components/cards/salesPerVisitChartCard";
import DailyDietListCard from "../../components/cards/dailyDietListCard";

import MonthlySalesStatisticsBarChartCard from "../../components/cards/monthlySalesStatisticsBarChartCard";
import ShoppingCartCard from "../../components/cards/shoppingCartCard";

import HobbiesStatisticsBarChartCard from "../../components/cards/hobbiesStatisticsBarChartCard";
import UserListCard from "../../components/cards/userListCard";
import ProjectStatsDonutChartCard from "../../components/cards/projectStatsDonutChartCard";

import UserStatisticsChartCard from "../../components/cards/userStatisticsChartCard";
import CarouselSliderCard from "../../components/cards/carouselSliderCard";
import EarningStatisticsChartCard from "../../components/cards/earningStatisticsChartCard";

class BasicCards extends Component {
   render() {
      return (
         <Fragment>
            <Row className="row-eq-height">
               <Col sm="12">
                  <ProductsSalesChartCard
                     productsSalesData={AdvancedCardData.ProductsSalesData}
                     cardTitle="Products Sales"
                     salesText="Sales"
                     visitText="Visits"
                  />
               </Col>
            </Row>

            <Row className="row-eq-height">
               <Col sm="12" lg="6" xl="8">
                  <VisitSalesStatisticsCard
                     visitSalesData={AdvancedCardData.VisitSalesData}
                     cardTitle="Visit & Sales Statistics"
                     salesText="Sales"
                     visitText="Visits"
                  />
               </Col>
               <Col sm="12" lg="6" xl="4">
                  <WeeklyStatisticsLineChartCard
                     weeklySalesStatisticsBarChartData={AdvancedCardData.WeeklySalesStatisticsBarChartData}
                     cardBgColor="gradient-blackberry"
                     cardTitle="Statistics"
                     statisticsAmount="$ 78.89"
                     statisticsRangeAmount="Week2 +15.44"
                  />
               </Col>
            </Row>

            <Row className="row-eq-height">
               <Col sm="12" md="6" xl="4">
                  <DiscoverPeopleListCard
                     discoverPeopleList={AdvancedCardData.DiscoverPeopleList}
                     cardTitle="Peoples"
                  />
               </Col>
               <Col sm="12" md="6" xl="8">
                  <SalesAnalysisChartCarda
                     salesAnalysisData={AdvancedCardData.SalesAnalysisData}
                     cardTitle="Sales Analysis"
                     salesText="Sales"
                     visitText="Visits"
                     clickText="Clicks"
                  />
               </Col>
            </Row>

            <Row className="row-eq-height">
               <Col sm="12" md="8">
                  <SalesPerVisitChartCard
                     salesPerVisitData={AdvancedCardData.SalesPerVisitData}
                     cardTitle="Sales Per Visit"
                     salesText="Sales"
                     visitText="Visits"
                  />
               </Col>
               <Col sm="12" md="4">
                  <DailyDietListCard
                     dailyDietList={AdvancedCardData.DailyDietList}
                     cardTitle="Daily Diet"
                     cardSubTitle="Some quick example text to build on the card."
                  />
               </Col>
            </Row>

            <Row className="row-eq-height">
               <Col sm="12" md="4">
                  <MonthlySalesStatisticsBarChartCard
                     monthlySalesStatisticsBarChartData={AdvancedCardData.MonthlySalesStatisticsBarChartData}
                     cardTitle="Statistics"
                     cardSubTitle="Last 6 Months Sales"
                  />
               </Col>
               <Col sm="12" md="8">
                  <ShoppingCartCard shoppingCart={AdvancedCardData.ShoppingCart} cardTitle="Shopping Cart" />
               </Col>
            </Row>

            <Row className="row-eq-height">
               <Col sm="12" lg="6" xl="4">
                  <HobbiesStatisticsBarChartCard
                     hobbiesStatisticsBarChartData={AdvancedCardData.HobbiesStatisticsBarChartData}
                     cardTitle="Statistics"
                     cardSubTitle="Hobbies"
                  />
               </Col>
               <Col sm="12" lg="6" xl="4">
                  <UserListCard userListData={AdvancedCardData.UserListData} cardTitle="Users List" />
               </Col>
               <Col sm="12" lg="6" xl="4">
                  <ProjectStatsDonutChartCard
                     projectStatsDonutChartData={AdvancedCardData.ProjectStatsDonutChartData}
                     cardTitle="Projects Stats"
                     cardSubTitle="Project Tasks"
                  />
               </Col>

               <Col sm="12" lg="6" xl="4">
                  <UserStatisticsChartCard
                     userStatisticData={AdvancedCardData.UserStatisticData}
                     fullName="Kevin Sullivan"
                     designation="UX Designer"
                  />
               </Col>
               <Col sm="12" lg="6" xl="4">
                  <CarouselSliderCard
                     cardTitle="Card Titile"
                     description="Sweet halvah dragée jelly-o halvah carrot cake oat cake. Donut jujubes jelly chocolate cake."
                  />
               </Col>
               <Col sm="12" lg="6" xl="4">
                  <EarningStatisticsChartCard
                     earningStatisticData={AdvancedCardData.EarningStatisticData}
                     cardTitle="Earning"
                     cardSubTitle="Mon 18 - Sun 21"
                     earningAmount="$4295.36"
                     earningText="Total Earnings"
                  />
               </Col>
            </Row>
         </Fragment>
      );
   }
}
export default BasicCards;
