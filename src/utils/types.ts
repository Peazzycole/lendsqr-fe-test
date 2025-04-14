export interface UserData {
    id: string;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residenceType: string;
    educationLevel: string;
    employmentStatus: string;
    sector: string;
    durationEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: number;
    twitter: string;
    facebook: string;
    instagram: string;
    guarantors: Array<{
        fullName: string;
        phoneNumber: string;
        email: string;
        relationship: string;
    }>;
    tier: number;
    balance: number;
    bank: string;
    accountNumber: number;
    bankId: string;
    status: string;
    organization: string;
    username: string;
    dateJoined: string;
}