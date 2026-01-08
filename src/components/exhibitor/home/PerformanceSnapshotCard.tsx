import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const PerformanceSnapshotCard = () => {
  return (
    <div className="space-y-6">
      {/* Profile Views */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your performance snapshot</h2>
        
        <h3 className="font-medium text-gray-900 mb-2">Profile views</h3>
        <p className="text-sm text-green-600 mb-4">↑ 15% higher than last week at this time</p>
        
        <div className="flex justify-end mb-2">
          <span className="text-xs text-gray-500">Show week</span>
        </div>
        
        {/* Chart placeholder */}
        <div className="h-32 mb-4 flex items-end justify-between gap-1 px-2">
          {[40, 35, 20, 15, 10, 25, 30, 45, 50, 35, 40, 30].map((height, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div 
                className="w-full bg-blue-900 rounded-t min-w-[8px]" 
                style={{ height: `${height * 2}px` }}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>12</span>
          <span>11</span>
          <span>10</span>
          <span>9</span>
          <span>8</span>
          <span>7</span>
          <span>6</span>
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
        </div>
        <p className="text-xs text-gray-500 text-center mb-4">Weeks remaining for the show</p>
        
        <div className="flex justify-center mb-6">
          <Button variant="outline" asChild>
            <Link to="/exhibitor-dashboard">View full report</Link>
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 text-center mb-2">Boost your visibility</h4>
          <p className="text-sm text-gray-500 text-center mb-4">
            Stand out from the rest to get your brand seen 5x more often. <span className="text-gray-400">(additional cost applies)</span>
          </p>
          <div className="flex justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Ask about Priority plus Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Viewers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-medium text-gray-900 mb-2 text-center">Your profile viewers</h3>
        <p className="text-sm text-gray-500 text-center mb-4">(Showing 2 of 11)</p>
        
        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-medium text-gray-600">Company name</th>
              <th className="text-right py-2 font-medium text-gray-600">Contact no.</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 text-gray-900">Actibio cosmetics</td>
              <td className="text-right py-2 text-gray-600">+1 9873300134</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 text-gray-900">Chemyunion Inc</td>
              <td className="text-right py-2 text-gray-600">+44 8742220099</td>
            </tr>
          </tbody>
        </table>
        
        <p className="text-sm text-blue-600 text-center mb-4">+ 9 more</p>
        
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link to="/profile-viewer">Discover my viewers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
