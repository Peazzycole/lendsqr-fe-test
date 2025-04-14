export interface UserData {
    id: string;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}