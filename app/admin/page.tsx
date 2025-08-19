export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, Francisco! 👋
                </h1>
                <p className="text-gray-600">
                    Manage your web development business and client projects from here.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Admin Dashboard
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Select a tool from the sidebar to get started managing your freelance business.
                    </p>
                </div>
            </div>
        </div>
    )
}