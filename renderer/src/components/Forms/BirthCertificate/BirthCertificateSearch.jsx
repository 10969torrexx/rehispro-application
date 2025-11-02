import { useState, useEffect } from "react";
import { BirthCertServices } from "@services";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { LoadingScreen } from '@components';

export default function BirthCertificateSearch () {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        registryNumber: '',
    });
    const handleOnChange = (e) => { 
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    return (
        <div className="flex flex-col w-full gap-2 p-2">
            <div className="flex-1 p-2">
                <h3 className="text-semibold mb-2 w-full text-center">Search Details</h3>
                <form action="" method="post" className="w-full flex flex-col gap-2">
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="registryNumber">Registry Number</label>
                            <input type="text" className="common-input w-full" placeholder="Registry Number" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" className="common-input w-full" placeholder="Date of Birth" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="placeOfBirth">Place of Birth</label>
                            <input type="text" className="common-input w-full" placeholder="Place of Birth" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-row gap-2">
                        <div className="flex-1">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="common-input w-full" placeholder="First Name" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="middleName">Middle Name</label>
                            <input type="text" className="common-input w-full" placeholder="Middle Name" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="common-input w-full" placeholder="Last Name" />
                        </div>
                    </div>
                </form>
                <button className="btn-primary mt-4 px-4 py-2 rounded-full shadow-lg">Search</button>
            </div>
            <div className="flex-1 p-2 test-element"></div>
        </div>
    )
}