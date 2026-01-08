import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Phone, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MainNav } from '@/components/exhibitor/MainNav';
import { TopBar } from '@/components/exhibitor/TopBar';

interface Task {
  id: string;
  title: string;
  status: 'overdue' | 'completed' | 'pending';
  dueDate: string;
  mandatory?: boolean;
  checked: boolean;
}

interface ProfileViewer {
  companyName: string;
  contactNo: string;
}

const Home = () => {
  const [language, setLanguage] = useState('en-GB');
  const [eventEdition, setEventEdition] = useState('2025');
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Edit company profile', status: 'overdue', dueDate: '24th Jan 2025', checked: false },
    { id: '2', title: 'Manage sharers', status: 'overdue', dueDate: '6th Feb 2025', checked: false },
    { id: '3', title: 'Admin, marketing and operations', status: 'pending', dueDate: '14th Feb 2025', mandatory: true, checked: false },
    { id: '4', title: 'Invite customers', status: 'completed', dueDate: '16th Feb 2025', checked: true },
    { id: '5', title: 'Manage badges', status: 'completed', dueDate: '24th Jan 2025', checked: true },
    { id: '6', title: 'Create Offer to capture leads', status: 'completed', dueDate: '24th Jan 2025', checked: true },
    { id: '7', title: 'View Exhibitor manual', status: 'pending', dueDate: '1st Mar 2025', checked: false },
    { id: '8', title: 'Custom task for operations', status: 'pending', dueDate: '1st Mar 2025', checked: false },
    { id: '9', title: 'Explore the shop', status: 'completed', dueDate: '3rd Mar 2025', checked: true },
    { id: '10', title: 'Upgrade package', status: 'completed', dueDate: '3rd Mar 2025', checked: true },
    { id: '11', title: 'Set up meetings', status: 'pending', dueDate: '10th Mar 2025', checked: false },
    { id: '12', title: 'Upload documents for Colleqt', status: 'pending', dueDate: '10th Mar 2025', checked: false },
    { id: '13', title: 'Set up Lead Manager App', status: 'pending', dueDate: '10th Mar 2025', checked: false },
  ]);

  const profileViewers: ProfileViewer[] = [
    { companyName: 'Actibio cosmetics', contactNo: '+1 9873300134' },
    { companyName: 'Chemyunion Inc', contactNo: '+44 8742220099' },
  ];

  const completedTasks = tasks.filter(t => t.checked).length;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, checked: !task.checked } : task
    ));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <TopBar 
        eventName="The London Book Fair"
        eventDates="11 - 13 March 2025"
        eventLocation="Olympia London"
        language={language}
        onLanguageChange={setLanguage}
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />
      <MainNav />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Task Progress - Left Column */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Task progress</CardTitle>
                  <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {completedTasks} of {tasks.length} tasks completed
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer">
                      <Checkbox 
                        checked={task.checked} 
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{task.title}</p>
                        <div className="flex items-center gap-1 text-xs">
                          {task.status === 'overdue' && (
                            <span className="text-destructive">⊘ Overdue {task.dueDate}</span>
                          )}
                          {task.status === 'completed' && (
                            <span className="text-green-600">✓ Completed ⊘ Due {task.dueDate}</span>
                          )}
                          {task.status === 'pending' && (
                            <span className="text-muted-foreground">⊘ Due {task.dueDate}</span>
                          )}
                        </div>
                        {task.mandatory && (
                          <span className="text-xs text-destructive">{task.mandatory ? '7 mandatory' : ''}</span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Actions - Middle Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recommended actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Completion */}
                <div className="text-center pb-6 border-b">
                  <h3 className="font-semibold mb-4">Profile Completion</h3>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
                      <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="none" 
                        className="text-amber-400" 
                        strokeDasharray={`${30 * 2.2} ${100 * 2.2}`} 
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">30%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Your profile is 30% complete</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Do you know that completed profiles get an average of <strong>17 times more views</strong> than incomplete profiles?
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/edit-company-profile">Edit profile</Link>
                  </Button>
                </div>

                {/* Capture More Leads */}
                <div className="text-center pb-6 border-b">
                  <h3 className="font-semibold mb-4">Capture more leads</h3>
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Want to make over 50 additional connections at the show? <span className="text-xs">(additional cost applies)</span>
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Request Lead Booster Info
                  </Button>
                </div>

                {/* Invite Your Customers */}
                <div className="pb-6 border-b">
                  <h3 className="font-semibold mb-4">Invite your customers</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Invites allocated</span>
                        <span className="font-medium">46</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-900 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customers viewed</span>
                        <span className="font-medium">38</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-700 rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customers registered</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 mb-3">
                    Ensure you use all your invites for maximum value
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/invite-customers">Invite more customers</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Looking to invite more customers?{' '}
                    <a href="#" className="text-blue-600 hover:underline">Buy more invites</a>
                  </p>
                </div>

                {/* Compare with Competitors */}
                <div>
                  <h3 className="font-semibold mb-4">Compare with competitors</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your Profile views</span>
                        <span className="font-medium">267</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-900 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Average Profile views</span>
                        <span className="font-medium">?</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-orange-300 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 mb-3 text-center">
                    Please answer a few pending profile questions to unlock your insights and get matched with the right benchmarks.
                  </p>
                  <div className="text-center">
                    <Button variant="outline">Unlock full report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Snapshot - Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Your performance snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Views */}
                <div>
                  <h3 className="font-semibold mb-2">Profile views</h3>
                  <p className="text-sm text-green-600 mb-4">↑ 15% higher than last week at this time</p>
                  
                  {/* Simple Bar Chart Placeholder */}
                  <div className="h-32 flex items-end gap-1 mb-2">
                    {[25, 30, 20, 35, 40, 30, 25, 20, 15, 45, 50, 35].map((height, i) => (
                      <div key={i} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">Weeks remaining for the show</p>
                  
                  <div className="text-center mt-4">
                    <Button variant="outline" asChild>
                      <Link to="/exhibitor-dashboard">View full report</Link>
                    </Button>
                  </div>
                </div>

                {/* Boost Your Visibility */}
                <div className="text-center pt-4 border-t">
                  <h4 className="font-medium mb-2">Boost your visibility</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Stand out from the rest to get your brand seen 5x more often. <span className="italic">(additional cost applies)</span>
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Ask about Priority plus Profile
                  </Button>
                </div>

                {/* Profile Viewers */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Your profile viewers</h3>
                  <p className="text-xs text-muted-foreground text-center mb-3">(Showing 2 of 11)</p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-2 font-medium">Company name</th>
                          <th className="text-right p-2 font-medium">Contact no.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {profileViewers.map((viewer, i) => (
                          <tr key={i}>
                            <td className="p-2">{viewer.companyName}</td>
                            <td className="p-2 text-right text-muted-foreground">{viewer.contactNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-center py-2 text-xs text-muted-foreground">+ 9 more</div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <Button variant="outline" asChild>
                      <Link to="/profile-viewer">Discover my viewers</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-8 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Calendar className="h-4 w-4" />
                <span>Tuesday, 11 March 2025</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Calendar className="h-4 w-4" />
                <span>Wednesday, 12 March 2025</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Thursday, 13 March 2025</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Phone className="h-4 w-4" />
                <span>+44 (0)20 82712124</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Olympia London, Hammersmith Road, London, W14 8UX</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Useful Links</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">Help</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Contact us</a></li>
                <li><a href="#" className="hover:underline">Meet the team</a></li>
                <li><a href="#" className="hover:underline">Safety at Our Event</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Linkedin</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-2">
              <span className="font-semibold">Privacy Options</span>
              <a href="#" className="hover:underline">Cookie Policy</a>
              <a href="#" className="hover:underline">Your Privacy Choices</a>
              <a href="#" className="hover:underline">RX Global Privacy Policy</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 RX Global</p>
            <p className="text-xs text-muted-foreground mt-2">
              The London Book Fair, RX, and Reed Exhibitions are trade marks of Reed Exhibitions Limited and its affiliates. RELX and the "RE" logo are trade marks of RELX Group plc, used under licence. Reed Exhibitions Limited is a private limited company, having its registered and principal office at Gateway House, 28 The Quadrant, Richmond, Surrey, TW9 1DN, registered in England and Wales with Company No. 678540. Business activity: Activities of exhibition and fair organisers VAT No. GB 232 4004 20 Tax ID No: 13960 00581
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
