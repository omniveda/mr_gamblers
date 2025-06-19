<div className="absolute inset-0 mt-20 z-10 flex justify-center items-center px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
            {/* Left Section: Logo */}
            <div
              className="flex items-center justify-center p-6 md:w-1/3"
              style={{ backgroundColor: bgColor }}
            >
              {casino.logo ? (
                <img
                  ref={imgRef}
                  src={casino.logo}
                  alt={casino.name}
                  className="max-h-24"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
                <div className="text-white text-lg">No logo available</div>
              )}
            </div>

            {/* Right Section: Details */}
            <div className="p-6 text-left md:w-2/3">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  {casino.name}
                </h2>
                <div className="flex items-center text-red-500 font-bold">
                  <span className="text-xl">{casino.rating.toFixed(1)}</span>
                  <span className="ml-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(casino.rating) ? "⭐" : "☆"}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Bonuses */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="border rounded-lg px-4 py-2 flex items-center gap-2 border-gray-300">
                  <span role="img" aria-label="Deposit">
                    💰
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Deposit Bonus</p>
                    <p className="text-sm font-semibold">
                      {casino.depositBonus || "No deposit bonus"}
                    </p>
                  </div>
                </div>
                <div className="border rounded-lg px-4 py-2 flex items-center gap-2 border-gray-300">
                  <span role="img" aria-label="Spins">
                    🎰
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Welcome Bonus</p>
                    <p className="text-sm font-semibold">
                      {casino.welcomeBonus || "No welcome bonus"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="mt-4 text-sm text-gray-700">
                <h3 className="font-semibold mb-1">Overview</h3>
                <p>{casino.overview || "No overview available."}</p>
              </div>

              {/* Features */}
              {casino.generalInfo?.features?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-sm">
                  {casino.generalInfo.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-2 py-1 rounded-full text-center"
                    >
                      ✅ {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {casino.visits || 0} Has Already Visited!
                </p>
                <a
                  href={casino.generalInfo?.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full"
                >
                  Play now
                </a>
              </div>
            </div>
          </div>
        </div>