import React, { useState, FormEvent } from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
    onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
    const [organization, setOrganization] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState('');

    const handleReset = () => {
        setOrganization('');
        setUsername('');
        setEmail('');
        setDate('');
        setPhoneNumber('');
        setStatus('');
    };

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        // Implement your filtering logic here...
        // For example, call a parent function to filter data in the table
        onClose();
    };

    return (
        <div className={styles.panelContainer}>
            <div className={styles.panel}>
                <form onSubmit={handleFilter}>
                    <div className={styles.formControl}>
                        <label>Organization</label>
                        <select
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Lendsqr">Lendsqr</option>
                            <option value="Irorun">Irorun</option>
                            {/* ...additional organizations */}
                        </select>
                    </div>

                    <div className={styles.formControl}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="User"
                        />
                    </div>

                    <div className={styles.formControl}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="xyz@abc.com"
                        />
                    </div>

                    <div className={styles.formControl}>
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.formControl}>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+234..."
                        />
                    </div>

                    <div className={styles.formControl}>
                        <label>Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                        </select>
                    </div>

                    <div className={styles.actionButtons}>
                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit">
                            Filter
                        </button>
                    </div>
                </form>
            </div>
            {/* Overlay behind the panel to close it */}
            <div className={styles.overlay} onClick={onClose}></div>
        </div>
    );
};
