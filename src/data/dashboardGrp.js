export const sidebarItems = [
  {
    id: 1,
    href: "/",
    iconClass: "icon-home text-26",
    label: "Home Page",
  },

  {
    id: 2,
    href: "/camps",
    iconClass: "icon-menu text-26",
    label: "Camp list",
  },

  {
    id: 3,
    href: "/db-main",
    iconClass: "icon-dashboard text-26",
    label: "Dashboard",
  },
 

  {
    id: 4,
    href: "/db-listing-grp",
    iconClass: "icon-heart text-26",
    label: "My Listings",
  },
  {
    id: 5,
    href: "/db-add-tour",
    iconClass: "icon-clipboard text-26",
    label: "Add Tour",
  },


  {
    id: 6,
    href: "/campgrp-dashboard",
    iconClass: "icon-account text-26",
    label: "My Profile",
  },
  {
    id: 7,
    href: "/db-add-blog",
    iconClass: "icon-pencil text-26",
    label: "Blog",
  },
  {
    id: 8,
    href: "#",
    iconClass: "icon-logout text-26",
    label: "Logout",
  }
];


export const states = [
  {
    id: 1,
    title: "Total Earnings",
    amount: "$10,800",
    today: "$50",
    iconClass: "icon-wallet text-accent-1",
  },
  {
    id: 2,
    title: "Total Pending",
    amount: "$12,800",
    today: "40+",
    iconClass: "icon-payment text-accent-1",
  },
  {
    id: 3,
    title: "Total Booking",
    amount: "$54,800",
    today: "90+",
    iconClass: "icon-booking text-accent-1",
  },
  {
    id: 4,
    title: "Wishlist",
    amount: "1834",
    today: "290+",
    iconClass: "icon-heart text-accent-1",
  },
];

export const notificationData = [
  {
    id: 1,
    icon: "icon-home",
    message: "Your listing House on the Beverly Hills has been approved",
  },
  {
    id: 2,
    icon: "icon-review",
    message: "Dollie Horton left a review on House on the Northridge",
  },
  {
    id: 3,
    icon: "icon-heart",
    message: "Someone favorites your Triple Story House for Rent listing",
  },
  {
    id: 4,
    icon: "icon-heart",
    message: "Someone favorites your Triple Story House for Rent listing",
  },
  {
    id: 5,
    icon: "icon-home",
    message: "Your listing House on the Beverly Hills has been approved",
  },
  {
    id: 6,
    icon: "icon-review",
    message: "Dollie Horton left a review on House on the Northridge",
  },
];

export const tabContentStaticties = [
  {
    id: 1,
    label: "Hours",
    data: [
      { name: "12PM", value: 148 },
      { name: "2AM", value: 100 },
      { name: "4AM", value: 205 },
      { name: "6AM", value: 110 },
      { name: "8AM", value: 165 },
      { name: "10AM", value: 145 },
      { name: "12AM", value: 180 },
      { name: "2PM", value: 156 },
      { name: "4PM", value: 148 },
      { name: "6PM", value: 220 },
      { name: "8PM", value: 180 },
      { name: "10PM", value: 245 },
    ],
  },
  {
    id: 2,
    label: "Weekly",
    data: [
      { name: "1st", value: 158 },

      { name: "2nd", value: 210 },
      { name: "3rd", value: 180 },
      { name: "4th", value: 235 },
      { name: "5th", value: 100 },
    ],
  },
  {
    id: 3,
    label: "Monthly",
    data: [
      { name: "Jan", value: 158 },
      { name: "Feb", value: 100 },
      { name: "Marc", value: 235 },
      { name: "April", value: 210 },
      { name: "May", value: 165 },
      { name: "Jun", value: 145 },
      { name: "July", value: 190 },
      { name: "Agust", value: 156 },
      { name: "Sept", value: 148 },
      { name: "Oct", value: 210 },
      { name: "Now", value: 180 },
      { name: "Dec", value: 235 },
    ],
  },
];

export const bookingData = [
  {
    id: 1,
    orderNumber: "#484",
    imageUrl: "/img/dashboard/booking/1.jpg",
    title:
      "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
    startDate: "11 April 2023",
    endDate: "11 April 2023",
    numberOfPeople: "2 People",
    cost: "$392.89",
    status: "Approved",
  },
  {
    id: 2,
    orderNumber: "#485",
    imageUrl: "/img/dashboard/booking/2.jpg",
    title: "Zipline 18 Platform and ATV Adventure Tour From Phuket",
    startDate: "12 April 2023",
    endDate: "12 April 2023",
    numberOfPeople: "3 People",
    cost: "$412.50",
    status: "Pending",
  },
  {
    id: 3,
    orderNumber: "#486",
    imageUrl: "/img/dashboard/booking/3.jpg",
    title: "Phang Nga Bay & James Bond Island with Canoeing By Big Boat",
    startDate: "13 April 2023",
    endDate: "13 April 2023",
    numberOfPeople: "4 People",
    cost: "$550.00",
    status: "Cancelled",
  },
  {
    id: 4,
    orderNumber: "#487",
    imageUrl: "/img/dashboard/booking/4.jpg",
    title: "James Bond Island Tour from Phuket by Longtail Boat with Lunch",
    startDate: "14 April 2023",
    endDate: "14 April 2023",
    numberOfPeople: "2 People",
    cost: "$420.99",
    status: "Pending",
  },
  {
    id: 5,
    orderNumber: "#488",
    imageUrl: "/img/dashboard/booking/5.jpg",
    title: "Phuket City Tour: Karon View Point, Big Buddha & Wat Chalong",
    startDate: "15 April 2023",
    endDate: "15 April 2023",
    numberOfPeople: "3 People",
    cost: "$380.00",
    status: "Approved",
  },
  // Add more entries as needed
];

export const messageSanders = [
  {
    id: 1,
    image: "/img/dashboard/messages/sidebar/1.png",
    badgeColor: "",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 2,
    image: "/img/dashboard/messages/sidebar/2.png",
    badgeColor: "bg-accent-2",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 3,
    image: "/img/dashboard/messages/sidebar/3.png",
    badgeColor: "bg-green-3",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 4,
    image: "/img/dashboard/messages/sidebar/4.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 5,
    image: "/img/dashboard/messages/sidebar/5.png",
    badgeColor: "bg-yellow-3",
    badgeText: "2",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 6,
    image: "/img/dashboard/messages/sidebar/6.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 7,
    image: "/img/dashboard/messages/sidebar/7.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
  {
    id: 8,
    image: "/img/dashboard/messages/sidebar/8.png",
    badgeColor: "",
    badgeText: "",
    name: `Darlene Robertson`,
    role: `Head of Development`,
    time: `35 mins`,
  },
];
