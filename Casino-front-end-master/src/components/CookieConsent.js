import React, { useEffect, useState } from "react";

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    document.body.style.backgroundColor = "#1e1e1e";
    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setShowBanner(true);
            setTimeout(() => setIsVisible(true), 100);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "accepted");
        setIsVisible(false);
        setTimeout(() => setShowBanner(false), 300);
    };

    const handleCustomize = () => {
        setShowDetails(!showDetails);
    };

    if (!showBanner) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 w-full z-50 transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
        >
            <div className="bg-[#1e1e1e] border-t border-gray-200 shadow-md w-full">
                <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 text-sm text-white">
                        <h3 className="text-base font-semibold text-red-800 mb-1">
                            We value your privacy
                        </h3>
                        <p className="text-sm text-white mb-2">
                            We use cookies to enhance your experience. Some cookies are essential.
                        </p>

                        {showDetails && (
                            <div className="mt-2 bg-[#181818] p-3 rounded-md">
                                <h4 className="text-sm font-medium text-white mb-2">Cookie Preferences</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm text-white">
                                        <input type="checkbox" checked disabled className="accent-red-600" />
                                        <span>Essential Cookies <span className="text-gray-400">(Required)</span></span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-sm text-white">
                                        <input type="checkbox" defaultChecked className="accent-red-600" />
                                        <span>Analytics Cookies</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-sm text-white">
                                        <input type="checkbox" defaultChecked className="accent-red-600" />
                                        <span>Marketing Cookies</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                            onClick={handleCustomize}
                            className="px-4 py-2 rounded-md text-sm border border-gray-300 text-red-800 bg-[#1e1e1e] hover:bg-gray-100 transition"
                        >
                            {showDetails ? "Hide Options" : "Customize"}
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-700 transition"
                        >
                            Accept All
                        </button>
                    </div>
                </div>

                <div className="px-4 pb-3 text-xs text-white text-center">
                    By continuing, you agree to our{" "}
                    <a href="/privacy" className="text-red-600 hover:underline">
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/cookies" className="text-red-600 hover:underline">
                        Cookie Policy
                    </a>.
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
