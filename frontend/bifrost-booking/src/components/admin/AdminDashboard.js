import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sky-800">
            <h1 className="text-4xl text-sky-50 font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Link to="/admin/manage-flights" className="bg-sand-500 text-sand-950 py-2 px-4 rounded-md shadow-md hover:bg-sand-600 hover:text-sand-100">
                    Manage Flights
                </Link>
                <Link to="/admin/manage-bookings" className="bg-salmon-500 text-salmon-950 py-2 px-4 rounded-md shadow-md hover:bg-salmon-600 hover:text-salmon-100">
                    Manage Bookings
                </Link>
            </div>
        </div>
    )
};

export default AdminDashboard;