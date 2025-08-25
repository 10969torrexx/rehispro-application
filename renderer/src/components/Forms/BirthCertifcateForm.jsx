import React from 'react';
export default function BirthCertifcateForm() {
    const [currentPage, setCurrentPage] = React.useState(1);
    return (
        <form>
            <div className='w-full'>
                {currentPage === 1 && 
                    <div className="mb-4 text-center">
                        <p>Page 1</p>
                    </div>
                }

                {currentPage === 2 && 
                    <div className="mb-4 text-center">
                        <p>Page 2</p>
                    </div>
                }

                {currentPage === 3 && 
                    <div className="mb-4 text-center">
                        <p>Page 3</p>
                    </div>
                }

                {currentPage === 4 && 
                    <div className="mb-4 text-center">
                        <p>Page 4</p>
                    </div>
                }

                {currentPage === 5 && 
                    <div className="mb-4 text-center">
                        <p>Page 5</p>
                    </div>
                }

                {currentPage === 6 && 
                    <div className="mb-4 text-center">
                        <p>Page 6</p>
                    </div>
                }

                {currentPage === 7 && 
                    <div className="mb-4 text-center">
                        <p>Page 7</p>
                    </div>
                }

                {currentPage === 8 && 
                    <div className="mb-4 text-center">
                        <p>Page 8</p>
                    </div>
                }
            </div>
            <div className='flex justify-center'>
                
            </div>
        </form>
    )
}