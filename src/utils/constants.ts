import usersIcon from '../assets/users.png';
import gurantorIcon from '../assets/gurantors.png';
import sackIcon from '../assets/sack.png';
import handshakeIcon from '../assets/handshake.png';
import piggyIcon from '../assets/piggy.png';
import loanIcon from '../assets/loan.png';
import userCheckIcon from '../assets/user-check.png';
import userCogIcon from '../assets/user-cog.png';
import briefcaseIcon from '../assets/briefcase.png';
import bankIcon from '../assets/bank.png';
import coinsIcon from '../assets/coins.png';
import transactionIcon from '../assets/transaction.png';
import galaxyIcon from '../assets/galaxy.png';
import userTimesIcon from '../assets/user-times.png';
import scrollIcon from '../assets/scroll.png';
import chartIcon from '../assets/chart.png';
import sliderIcon from '../assets/sliders.png';
import badgeIcon from '../assets/badge.png';
import clipboardIcon from '../assets/clipboard.png';
import tireIcon from '../assets/tire.png';


export const sidebarMenus = [
    {
        name: "Customers",
        subCategories: [
            {
                name: 'Users',
                icon: usersIcon
            },
            {
                name: 'Gurantors',
                icon: gurantorIcon
            },
            {
                name: 'Loans',
                icon: sackIcon
            },
            {
                name: 'Decision Models',
                icon: handshakeIcon
            },
            {
                name: 'Savings',
                icon: piggyIcon
            },
            {
                name: 'Loan Requests',
                icon: loanIcon
            },
            {
                name: 'Whitelist',
                icon: userCheckIcon
            },
            {
                name: 'Karma',
                icon: userTimesIcon
            },
        ]
    },
    {
        name: "Businesses",
        subCategories: [
            {
                name: 'Organization',
                icon: briefcaseIcon
            },
            {
                name: 'Loan Products',
                icon: loanIcon
            },
            {
                name: 'Savings Products',
                icon: bankIcon
            },
            {
                name: 'Fees and Charges',
                icon: coinsIcon
            },
            {
                name: 'Transactions',
                icon: transactionIcon
            },
            {
                name: 'Services',
                icon: galaxyIcon
            },
            {
                name: 'Service Account',
                icon: userCogIcon
            },
            {
                name: 'Settlements',
                icon: scrollIcon
            },
            {
                name: 'Reports',
                icon: chartIcon
            },
        ]
    },
    {
        name: "Settings",
        subCategories: [
            {
                name: 'Preferences',
                icon: sliderIcon
            },
            {
                name: 'Fees and Pricing',
                icon: badgeIcon
            },
            {
                name: 'Audit Logs',
                icon: clipboardIcon
            },
            {
                name: 'Systems Messages',
                icon: tireIcon
            },
        ]
    }
]