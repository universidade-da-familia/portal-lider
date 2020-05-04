const AdvancedCardData = {
   WeeklySalesStatisticsBarChartData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [[80, 85, 75, 65, 63, 70, 82]]
   },
   MonthlySalesStatisticsBarChartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [[8, 9, 5, 6, 7, 4], [2, 1, 5, 4, 3, 6]]
   },

   HobbiesStatisticsBarChartData: {
      labels: ["Sport", "Music", "Travel", "News"],
      series: [[53, 23, 40, 30]]
   },

   ProjectStatsDonutChartData: {
      series: [
         {
            name: "Done",
            className: "ct-done",
            progressClassName: "bg-success",
            value: 40
         },
         {
            name: "Progress",
            className: "ct-progress",
            progressClassName: "bg-amber",
            value: 15
         },
         {
            name: "Outstanding",
            className: "ct-outstanding",
            progressClassName: "bg-deep-purple bg-lighten-1",
            value: 20
         },
         {
            name: "Started",
            className: "ct-started",
            progressClassName: "bg-blue",
            value: 25
         }
      ]
   },
   UserListData: {
      series: [
         {
            img: "https://randomuser.me/api/portraits/med/women/10.jpg",
            fullName: "Jessica Rice",
            position: "UX Designer",
            flag: 1
         },
         {
            img: "https://randomuser.me/api/portraits/med/men/0.jpg",
            fullName: "Jacob Rios",
            position: "HTML Developer",
            flag: 0
         },
         {
            img: "https://randomuser.me/api/portraits/med/men/1.jpg",
            fullName: "Russell Delgado",
            position: "Database Designer",
            flag: 0
         },
         {
            img: "https://randomuser.me/api/portraits/med/women/3.jpg",
            fullName: "Sara McDonald",
            position: "Team Leader",
            flag: 1
         },
         {
            img: "https://randomuser.me/api/portraits/med/men/3.jpg",
            fullName: "Peter Parker",
            position: "UI/UX Designer",
            flag: 1
         }
      ]
   },
   DiscoverPeopleList: {
      series: [
         {
            img: "https://randomuser.me/api/portraits/med/women/0.jpg",
            fullName: "Jessica Jack",
            role: "Sales",
            followBtn: "gradient-blackberry white",
            followTxt: "Following"
         },
         {
            img: "https://randomuser.me/api/portraits/med/women/2.jpg",
            fullName: "Russell Rice",
            role: "Marketing",
            followBtn: "btn-outline-grey",
            followTxt: "Follow"
         },
         {
            img: "https://randomuser.me/api/portraits/med/women/3.jpg",
            fullName: "Sara McDo",
            role: "Sales",
            followBtn: "gradient-blackberry white",
            followTxt: "Following"
         },
         {
            img: "https://randomuser.me/api/portraits/med/women/9.jpg",
            fullName: "Marshal Jack",
            role: "Marketing",
            followBtn: "gradient-blackberry white",
            followTxt: "Following"
         },
         {
            img: "https://randomuser.me/api/portraits/med/men/6.jpg",
            fullName: "Tony Rios",
            role: "Engineering",
            followBtn: "btn-outline-grey",
            followTxt: "Follow"
         }
      ]
   },

   DailyDietList: {
      list: [
         {
            item: "Protein Milk",
            priorityColor: "bg-primary",
            quantity: 4
         },
         {
            item: "Oz Water",
            priorityColor: "bg-info",
            quantity: 2
         },
         {
            item: "Vegetable Juice",
            priorityColor: "bg-warning",
            quantity: 6
         },
         {
            item: "Sugar Free Jello-O",
            priorityColor: "bg-success",
            quantity: 1
         },
         {
            item: "Protein Meal",
            priorityColor: "bg-danger",
            quantity: 3
         }
      ]
   },

   ShoppingCart: {
      list: [
         {
            img: "avatar-s-11",
            product: "Ferrero Rocher",
            quantity: 2,
            status: "active",
            amount: "$19.94",
            delete: "X"
         },
         {
            img: "avatar-s-11",
            product: "Headphones",
            quantity: 4,
            status: "cancled",
            amount: "$8.4",
            delete: "X"
         },
         {
            img: "avatar-s-11",
            product: "Camera",
            quantity: 1,
            status: "active",
            amount: "$20.24",
            delete: "X"
         },
         {
            img: "avatar-s-11",
            product: "Beer",
            quantity: 6,
            status: "active",
            amount: "$1.4",
            delete: "X"
         }
      ]
   },

   VisitSalesData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
         [5, 30, 25, 55, 45, 65, 60, 105, 80, 110, 120, 150],
         [80, 95, 87, 155, 140, 147, 130, 180, 160, 175, 165, 200]
      ]
   },

   ProductsSalesData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [[0, 20, 10, 45, 20, 36, 21, 0], [0, 5, 22, 14, 32, 12, 28, 0]]
   },

   SalesAnalysisData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [[65, 105, 145, 105, 145, 185], [125, 80, 30, 70, 110, 150], [175, 190, 160, 190, 140, 100]]
   },

   SalesPerVisitData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [[0, 5, 15, 8, 15, 9, 30, 0], [0, 3, 5, 2, 8, 1, 5, 0]]
   },

   UserStatisticData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      series: [[50, 70, 45, 75, 85]]
   },

   EarningStatisticData: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
      series: [[50, 45, 60, 55, 70, 55, 60, 55, 65, 57, 60, 53, 53]]
   }
};

export { AdvancedCardData };
