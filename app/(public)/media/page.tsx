import Link from "next/link";
import Image from "next/image";

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image 
              src="/mskt-logo.svg" 
              alt="MSKT Logo" 
              width={80} 
              height={80}
              className="w-20 h-20"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Media & Resources</h1>
          <p className="text-xl text-gray-600">
            Official media resources, documents, and downloads from the Maharashtra Sepaktakraw Association
          </p>
        </div>

        {/* Media Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Official Documents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <svg className="w-16 h-16 text-blue-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Official Documents</h3>
            <p className="text-gray-600 text-center mb-6">
              Access official rules, regulations, and policy documents
            </p>
            <Link
              href="/rules"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              View Documents
            </Link>
          </div>

          {/* Photo Gallery */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Photo Gallery</h3>
            <p className="text-gray-600 text-center mb-6">
              Browse through tournament photos and event highlights
            </p>
            <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
              Coming Soon
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-4">
              <svg className="w-16 h-16 text-purple-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                <path d="M14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Videos</h3>
            <p className="text-gray-600 text-center mb-6">
              Watch match highlights and training videos
            </p>
            <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
              Coming Soon
            </div>
          </div>
        </div>

        {/* Recent Media */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Media Updates</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-500">Updated Rules</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">2024 Tournament Rules</h3>
              <p className="text-sm text-gray-600 mb-3">
                Updated tournament rules and regulations for the 2024 season
              </p>
              <Link href="/rules" className="text-blue-600 hover:underline text-sm font-medium">
                View Rules →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-500">New Photos</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">District Championship 2024</h3>
              <p className="text-sm text-gray-600 mb-3">
                Photos from the recent district championship tournament
              </p>
              <div className="text-gray-400 text-sm font-medium">
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Media Guidelines */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Journalists</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Contact our media relations team for interviews</li>
                <li>• Request high-resolution photos and videos</li>
                <li>• Get official statements and press releases</li>
                <li>• Access to tournament schedules and results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Photographers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Submit photos for consideration</li>
                <li>• Follow photography guidelines at events</li>
                <li>• Get media credentials for tournaments</li>
                <li>• Share your work with the association</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Media Team */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Media Resources?</h2>
          <p className="text-gray-600 mb-6">
            Contact our media team for high-resolution images, official statements, or interview requests
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Media Team
            </Link>
            <Link
              href="/notices"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              View Press Releases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
