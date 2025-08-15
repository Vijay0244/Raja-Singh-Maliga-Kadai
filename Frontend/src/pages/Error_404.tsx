import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";

const Error_404: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="mx-auto w-26 h-26 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-5xl font-bold text-red-600">404</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">பக்கம் கிடைக்கவில்லை</h1>
                    <p className="text-gray-600 text-lg">நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <p className="text-gray-500 mb-4">தயவுசெய்து சரிபார்த்து மீண்டும் முயற்சிக்கவும் அல்லது கீழே உள்ள விருப்பங்களில் ஒன்றைத் தேர்ந்தெடுக்கவும்</p>
                </div>

                <div className="space-y-3">
                    <Button icon={Home} onClick={() =>navigate("/")} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">முகப்பு பக்கத்திற்கு செல்</Button>
                    <Button icon={ArrowLeft} onClick={() =>navigate(-1)} variant="secondary" className="w-full" size="lg">முந்தைய பக்கத்திற்கு திரும்பு</Button>
                </div>
            </div>
        </div>
    );
};

export default Error_404;