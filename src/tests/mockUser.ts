import type { UserDto } from "@/types/user.types";

export const mockUserData: UserDto = {
  id: "4d5e6f",
  fullName: "Grace Hopper",
  email: "grace.hopper@example.com",
  phoneNumber: "+1-555-2345",
  bvn: "10987654321",
  gender: "Female",
  maritalStatus: "Married",
  children: "2",
  residenceType: "House",
  educationLevel: "PhD",
  employmentStatus: "Employed",
  sector: "Defense",
  durationEmployment: "10 years",
  officeEmail: "grace.hopper@navy.gov",
  monthlyIncome: "₦800,000 - ₦1,000,000",
  loanRepayment: 25000,
  savings: 500000,
  twitter: "@gracehopper",
  facebook: "facebook.com/grace.hopper",
  instagram: "@gracehopper",
  guarantors: [
    {
      fullName: "Howard Aiken",
      phoneNumber: "+1-555-6789",
      email: "howard.aiken@example.com",
      relationship: "Colleague",
    },
    {
      fullName: "Jean Bartik",
      phoneNumber: "+1-555-9876",
      email: "jean.bartik@example.com",
      relationship: "Friend",
    },
  ],
  tier: 3,
  balance: 750000,
  bank: "United Bank",
  accountNumber: 9876543210,
  bankId: "UBN002",
  status: "Active",
  organization: "US Navy",
  username: "ghopper",
  dateJoined: "2022-03-01T08:15:00Z",
};


