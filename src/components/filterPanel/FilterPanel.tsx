import React from 'react';
import styles from './FilterPanel.module.scss';
import InputField from '../ui/input/InputField';
import SelectInput from '../ui/selectInput/SelectInput';
import { useUsers } from '../../context/UsersContext';
import { UserStatus } from '../../utils/constants';

interface FilterValues {
    organization: string;
    username: string;
    email: string;
    date: string;
    phoneNumber: string;
    status: string;
}

interface Props {
    values: FilterValues;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFilter: () => void;
    onClose: () => void
}

const FilterPanel: React.FC<Props> = ({ values, onChange, onFilter, onClose }) => {
    const { uniqueOrganizations } = useUsers();

    const handleReset = () => {
        onChange({ target: { name: 'organization', value: '' } } as React.ChangeEvent<HTMLInputElement>);
        onChange({ target: { name: 'username', value: '' } } as React.ChangeEvent<HTMLInputElement>);
        onChange({ target: { name: 'email', value: '' } } as React.ChangeEvent<HTMLInputElement>);
        onChange({ target: { name: 'date', value: '' } } as React.ChangeEvent<HTMLInputElement>);
        onChange({ target: { name: 'phoneNumber', value: '' } } as React.ChangeEvent<HTMLInputElement>);
        onChange({ target: { name: 'status', value: '' } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className={styles.container}>
            <label>
                Organization
                <SelectInput
                    placeholder="Select"
                    options={uniqueOrganizations}
                    value={values.organization}
                    onChange={(e) => onChange({ target: { name: 'organization', value: e } } as React.ChangeEvent<HTMLInputElement>)}
                />
            </label>
            <label>
                Username
                <InputField
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    label="User"
                    height="40px"
                    borderRadius="8px"
                    border="1px solid #213F7D20"
                />
            </label>
            <label>
                Email
                <InputField
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    label="Email"
                    height="40px"
                    borderRadius="8px"
                    border="1px solid #213F7D20"
                />
            </label>
            <label>
                Date
                <input
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={onChange}
                />
            </label>
            <label>
                Phone Number
                <InputField
                    type="number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={onChange}
                    label="Phone Number"
                    height="40px"
                    borderRadius="8px"
                    border="1px solid #213F7D20"
                />
            </label>
            <label>
                Status
                <SelectInput
                    placeholder="Select"
                    options={UserStatus}
                    value={values.status}
                    onChange={(e) => onChange({ target: { name: 'status', value: e } } as React.ChangeEvent<HTMLInputElement>)}
                />
            </label>

            <div className={styles.buttons}>
                <button type="button" className={styles.reset} onClick={handleReset}>
                    Reset
                </button>
                <button
                    type="button" className={styles.filter}
                    onClick={() => {
                        onFilter()
                        onClose()
                    }}
                >
                    Filter
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;