import React from 'react';
import styles from './FilterPanel.module.scss';
import { InputField, SelectInput } from '@/components/ui';
import { useUserFilters } from '@/hooks/useUsersFilters';
import { USERS_STATUS } from '@/utils';

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
    onReset: () => void
}

const FilterPanel: React.FC<Props> = ({ values, onChange, onFilter, onClose, onReset }) => {
    const { uniqueOrganizations } = useUserFilters();

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
                    options={USERS_STATUS}
                    value={values.status}
                    onChange={(e) => onChange({ target: { name: 'status', value: e } } as React.ChangeEvent<HTMLInputElement>)}
                />
            </label>

            <div className={styles.buttons}>
                <button type="button" className={styles.reset} onClick={() => {
                    onReset()
                    onClose()
                }}>
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