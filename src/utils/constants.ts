import usersIcon from "../assets/images/user-friends.svg";
import gurantorIcon from "../assets/images/users.svg";
import sackIcon from "../assets/images/sack.svg";
import handshakeIcon from "../assets/images/handshake.svg";
import piggyIcon from "../assets/images/piggy-bank.svg";
import loanIcon from "../assets/images/loan-request.svg";
import userCheckIcon from "../assets/images/user-check.svg";
import userCogIcon from "../assets/images/user-cog.svg";
import briefcaseIcon from "../assets/images/briefcase.svg";
import bankIcon from "../assets/images/bank.svg";
import coinsIcon from "../assets/images/coins.svg";
import transactionIcon from "../assets/images/transaction.svg";
import galaxyIcon from "../assets/images/galaxy.svg";
import userTimesIcon from "../assets/images/user-times.svg";
import scrollIcon from "../assets/images/scroll.svg";
import chartIcon from "../assets/images/chart-bar.svg";
import sliderIcon from "../assets/images/sliders.svg";
import badgeIcon from "../assets/images/badge-percent.svg";
import clipboardIcon from "../assets/images/clipboard-list.svg";
import tireIcon from "../assets/images/tire.svg";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  GO_TO_USER_DETAILS: (id: string | number) => `/users/${id}`,
  USER_DETAILS: "/users/:userId",
} as const;

// export const BASE_URL = "https://mock-api.net/api/lendsqr";
export const BASE_URL = "https://vo49r.wiremockapi.cloud";

export const USERS_STATUS = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "InActive",
    value: "inactive",
  },
  {
    label: "Blacklisted",
    value: "blacklisted",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

export const SIDEBAR_MENUS = [
  {
    name: "Customers",
    subCategories: [
      {
        name: "Users",
        icon: usersIcon,
      },
      {
        name: "Gurantors",
        icon: gurantorIcon,
      },
      {
        name: "Loans",
        icon: sackIcon,
      },
      {
        name: "Decision Models",
        icon: handshakeIcon,
      },
      {
        name: "Savings",
        icon: piggyIcon,
      },
      {
        name: "Loan Requests",
        icon: loanIcon,
      },
      {
        name: "Whitelist",
        icon: userCheckIcon,
      },
      {
        name: "Karma",
        icon: userTimesIcon,
      },
    ],
  },
  {
    name: "Businesses",
    subCategories: [
      {
        name: "Organization",
        icon: briefcaseIcon,
      },
      {
        name: "Loan Products",
        icon: loanIcon,
      },
      {
        name: "Savings Products",
        icon: bankIcon,
      },
      {
        name: "Fees and Charges",
        icon: coinsIcon,
      },
      {
        name: "Transactions",
        icon: transactionIcon,
      },
      {
        name: "Services",
        icon: galaxyIcon,
      },
      {
        name: "Service Account",
        icon: userCogIcon,
      },
      {
        name: "Settlements",
        icon: scrollIcon,
      },
      {
        name: "Reports",
        icon: chartIcon,
      },
    ],
  },
  {
    name: "Settings",
    subCategories: [
      {
        name: "Preferences",
        icon: sliderIcon,
      },
      {
        name: "Fees and Pricing",
        icon: badgeIcon,
      },
      {
        name: "Audit Logs",
        icon: clipboardIcon,
      },
      {
        name: "Systems Messages",
        icon: tireIcon,
      },
    ],
  },
];
