export default function CreateUsers() { 
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-10">
                <h2 className="text-2xl font-semibold mb-6">Add User</h2>

                <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="loginId">
                    Login ID
                    </label>
                    <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Enter login ID"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Enter password"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmPassword">
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full border border-gray-300 rounded-full px-3 py-2  focus:outline-none focus:border-purple-500"
                    placeholder="Confirm password"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                    >
                    Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600"
                    >
                    Add User
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}