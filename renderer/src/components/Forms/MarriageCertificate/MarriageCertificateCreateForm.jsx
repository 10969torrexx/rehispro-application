import { useState } from "react";

export default function MarriageCertificateCreateForm() {
    const [husbandBirthDate, setHusbandBirthDate] = useState("");
    const [husbandAge, setHusbandAge] = useState("");
    const [wifeBirthDate, setWifeBirthDate] = useState("");
    const [wifeAge, setWifeAge] = useState("");

    const calculateAge = (birthDate) => {
        if (!birthDate) return "";
        const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    const handleHusbandBirthDate = (e) => {
        const value = e.target.value;
        setHusbandBirthDate(value);
        setHusbandAge(calculateAge(value));
    };

    const handleWifeBirthDate = (e) => {
        const value = e.target.value;
        setWifeBirthDate(value);
        setWifeAge(calculateAge(value));
    };

    const [page, setPage] = useState(1);

    return (
        <form className="mt-5">
            {/* Province / City / Registry */}
            <div className="w-full flex items-center gap-2 mb-3">
                <div className="w-full">
                    <label>Province</label>
                    <input type="text" name="province" className="w-full common-input" placeholder="Province" />
                </div>
                <div className="w-full">
                    <label>City</label>
                    <input type="text" name="city" className="w-full common-input" placeholder="City/Municipality" />
                </div>
                <div className="w-full">
                    <label>Registry No.</label>
                    <input type="text" name="registry" className="w-full common-input" placeholder="Registry No." />
                </div>
            </div>

            <hr className="mb-3" />

            {/* Husband & Wife Columns */}
            <div className="w-full flex items-stretch gap-1 mb-3">
                {/* Husband Column */}
                <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                    <h3 className="text-center font-semibold mb-3">Husband</h3>

                    <span>1. Name of contracting parties</span>

                    {/* Name inputs */}
                    <div className="flex items-center gap-1 mt-1 mb-3">
                        <div className="w-full">
                            <label>First</label>
                            <input type="text" name="husbandFirstName" className="w-full common-input" placeholder="First" />
                        </div>
                        <div className="w-full">
                            <label>Middle</label>
                            <input type="text" name="husbandMiddleName" className="w-full common-input" placeholder="Middle" />
                        </div>
                        <div className="w-full">
                            <label>Last</label>
                            <input type="text" name="husbandLastName" className="w-full common-input" placeholder="Last" />
                        </div>
                    </div>

                    {/* DOB + Age labels */}
                    <span>
                        <p>2. Date of birth and Age</p>
                    </span>

                    {/* DOB + Age inputs */}
                    <div className="flex items-center gap-1 mt-1 mb-3">
                        <div className="w-full">
                            <label>Date of Birth</label>
                            <input type="date" name="husbandBirthDate" value={husbandBirthDate} onChange={handleHusbandBirthDate} className="w-full common-input" />
                        </div>
                        <div className="w-full">
                            <label>Age</label>
                            <input type="text" name="husbandAge" value={husbandAge} className="w-full common-input" placeholder="Age" readOnly />
                        </div>
                    </div>

                    {/* Place of Birth */}
                    <span>
                        <p>3. Place of Birth</p>
                    </span>

                    <div className="flex items-center gap-1 mt-1 mb-3">
                        <div className="w-full">
                            <label>City/Municipality</label>
                            <input type="text" name="husbandBirthCity" className="w-full common-input" placeholder="City/Municipality" />
                        </div>
                        <div className="w-full">
                            <label>Province</label>
                            <input type="text" name="husbandBirthProvince" className="w-full common-input" placeholder="Province" />
                        </div>
                        <div className="w-full">
                            <label>Country</label>
                            <input type="text" name="husbandBirthCountry" className="w-full common-input" placeholder="Country" />
                        </div>
                    </div>
                </div>

                {/* Wife Column */}
                <div className="flex-1 p-3 border border-pink-300 text-sm rounded">
                    <h3 className="text-center font-semibold mb-3">Wife</h3>

                    {/* Name label (empty but keeps alignment) */}
                    <span className="invisible">1. Name of contracting parties</span>

                    {/* Name inputs */}
                    <div className="flex items-center gap-1 mt-1 mb-3">
                        <div className="w-full">
                            <label>First</label>
                            <input type="text" name="wifeFirstName" className="w-full common-input" placeholder="First" />
                        </div>
                        <div className="w-full">
                            <label>Middle</label>
                            <input type="text" name="wifeMiddleName" className="w-full common-input" placeholder="Middle" />
                        </div>
                        <div className="w-full">
                            <label>Last</label>
                            <input type="text" name="wifeLastName" className="w-full common-input" placeholder="Last" />
                        </div>
                    </div>

                    {/* DOB + Age labels (empty but aligned) */}
                    <span className="invisible">
                        <p>2. Date of birth and Age</p>
                    </span>

                    {/* DOB + Age inputs */}
                    <div className="flex items-center gap-1 mt-1 mb-3">
                        <div className="w-full">
                            <label>Date of Birth</label>
                            <input type="date" name="wifeBirthDate" value={wifeBirthDate} onChange={handleWifeBirthDate} className="w-full common-input" />
                        </div>
                        <div className="w-full">
                            <label>Age</label>
                            <input type="text" name="wifeAge" value={wifeAge} className="w-full common-input" placeholder="Age" readOnly />
                        </div>
                    </div>

                    {/* Place of Birth */}
                    <span className="invisible">
                        <p>3. Place of Birth</p>
                    </span>

                    <div className="flex items-center gap-1 mt-1 mb-3">
                        <div className="w-full">
                            <label>City/Municipality</label>
                            <input type="text" name="wifeBirthCity" className="w-full common-input" placeholder="City/Municipality" />
                        </div>
                        <div className="w-full">
                            <label>Province</label>
                            <input type="text" name="wifeBirthProvince" className="w-full common-input" placeholder="Province" />
                        </div>
                        <div className="w-full">
                            <label>Country</label>
                            <input type="text" name="wifeBirthCountry" className="w-full common-input" placeholder="Country" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
