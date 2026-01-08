import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

export const RecommendedActionsCard = () => {
  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended actions</h2>
        
        <h3 className="font-medium text-gray-900 mb-4">Profile Completion</h3>
        
        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#f59e0b"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${0.3 * 251.2} 251.2`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-900">
              30%
            </span>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mb-2">Your profile is 30% complete</p>
        <p className="text-center text-sm text-gray-500 mb-4">
          Do you know that completed profiles get an average of <span className="font-semibold">17 times more views</span> than incomplete profiles?
        </p>
        
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/edit-company-profile">Edit profile</Link>
          </Button>
        </div>
      </div>

      {/* Capture More Leads */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Capture more leads</h3>
        
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🦋</span>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mb-2">
          Want to make over 50 additional connections at the show? <span className="text-gray-400">(additional cost applies)</span>
        </p>
        
        <div className="flex justify-center">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Request Lead Booster Info
          </Button>
        </div>
      </div>

      {/* Invite Your Customers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Invite your customers</h3>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Invites allocated</span>
              <span className="font-medium">46</span>
            </div>
            <Progress value={100} className="h-3 bg-gray-200 [&>div]:bg-blue-900" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Customers viewed</span>
              <span className="font-medium">38</span>
            </div>
            <Progress value={82} className="h-3 bg-gray-200 [&>div]:bg-amber-400" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Customers registered</span>
              <span className="font-medium">32</span>
            </div>
            <Progress value={70} className="h-3 bg-gray-200 [&>div]:bg-sky-300" />
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">Ensure you use all your invites for maximum value</p>
        
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/invite-customers">Invite more customers</Link>
          </Button>
          <p className="text-sm text-gray-500">Looking to invite more customers?</p>
          <Link to="/shop" className="text-sm text-blue-600 hover:underline">Buy more invites</Link>
        </div>
      </div>

      {/* Compare with Competitors */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-4">Compare with competitors</h3>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Your Profile views</span>
              <span className="font-medium">267</span>
            </div>
            <Progress value={100} className="h-3 bg-gray-200 [&>div]:bg-blue-900" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Average Profile views</span>
              <span className="font-medium">?</span>
            </div>
            <Progress value={50} className="h-3 bg-gray-200 [&>div]:bg-orange-400" />
          </div>
        </div>
        
        <p className="text-sm text-gray-500 text-center mb-4">
          Please answer a few pending profile questions to unlock your insights and get matched with the right benchmarks.
        </p>
        
        <div className="flex justify-center">
          <Button variant="outline">Unlock full report</Button>
        </div>
      </div>
    </div>
  );
};
