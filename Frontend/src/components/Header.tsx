import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from './Button'

const Header: React.FC = () => {

    const navigate = useNavigate()

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-gray-900">ராஜா சிங் ஸ்டோர்ஸ்</Link>
                    </div>
                    <Button icon={Plus} onClick={() => navigate("/add-product")} className="bg-green-600 hover:bg-green-700"><span className='hidden sm:block'>பொருள் சேர்க்க</span></Button>
                </div>
            </div>
        </header>
    )
}

export default Header