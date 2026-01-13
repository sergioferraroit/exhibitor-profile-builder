import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Phone, Info, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MainNav } from '@/components/exhibitor/MainNav';
import { TopBar } from '@/components/exhibitor/TopBar';
import { PageContainer, LayoutGrid } from '@/components/layout/LayoutGrid';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

interface Task {
  id: string;
  titleKey: string;
  status: 'overdue' | 'completed' | 'pending';
  dueDate: string;
  mandatory?: boolean;
  checked: boolean;
  link?: string;
}

interface ProfileViewer {
  companyName: string;
  contactNo: string;
}

const Home = () => {
  const [eventEdition, setEventEdition] = useState('2025');
  const { t } = useLanguage();
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', titleKey: 'task.editCompanyProfile', status: 'overdue', dueDate: '24th Jan 2025', checked: false, link: '/edit-company-profile' },
    { id: '2', titleKey: 'task.manageSharers', status: 'overdue', dueDate: '6th Feb 2025', checked: false, link: '/manage-shares' },
    { id: '3', titleKey: 'task.adminMarketingOperations', status: 'pending', dueDate: '14th Feb 2025', mandatory: true, checked: false, link: '/admin-marketing-operations' },
    { id: '4', titleKey: 'task.inviteCustomers', status: 'completed', dueDate: '16th Feb 2025', checked: true, link: '/invite-customers' },
    { id: '5', titleKey: 'task.manageBadges', status: 'completed', dueDate: '24th Jan 2025', checked: true, link: '/your-company-badges' },
    { id: '6', titleKey: 'task.createOfferToCapture', status: 'completed', dueDate: '24th Jan 2025', checked: true },
    { id: '7', titleKey: 'task.viewExhibitorManual', status: 'pending', dueDate: '1st Mar 2025', checked: false },
    { id: '8', titleKey: 'task.customTaskOperations', status: 'pending', dueDate: '1st Mar 2025', checked: false },
    { id: '9', titleKey: 'task.exploreTheShop', status: 'completed', dueDate: '3rd Mar 2025', checked: true },
    { id: '10', titleKey: 'task.upgradePackage', status: 'completed', dueDate: '3rd Mar 2025', checked: true },
    { id: '11', titleKey: 'task.setUpMeetings', status: 'pending', dueDate: '10th Mar 2025', checked: false },
    { id: '12', titleKey: 'task.uploadDocuments', status: 'pending', dueDate: '10th Mar 2025', checked: false },
    { id: '13', titleKey: 'task.setUpLeadManagerApp', status: 'pending', dueDate: '10th Mar 2025', checked: false },
  ]);

  const profileViewers: ProfileViewer[] = [
    { companyName: 'Actibio cosmetics', contactNo: '+1 9873300134' },
    { companyName: 'Chemyunion Inc', contactNo: '+44 8742220099' },
  ];

  const completedTasks = tasks.filter(t => t.checked).length;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      
      const newChecked = !task.checked;
      let newStatus: Task['status'];
      if (newChecked) {
        newStatus = 'completed';
      } else {
        newStatus = task.status === 'completed' ? 'pending' : task.status;
      }
      
      return { ...task, checked: newChecked, status: newStatus };
    }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <TopBar 
        eventName="The London Book Fair"
        eventDates="11 - 13 March 2025"
        eventLocation="Olympia London"
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />
      <MainNav />
      
      <main className="py-6">
        <PageContainer>
          <LayoutGrid>
            {/* Task Progress - Left Column */}
            <div className="col-span-full md:col-span-4">
            <Card className="rounded-[20px] border-[hsl(0_0%_84%)]">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{t('home.taskProgress')}</CardTitle>
                  <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[200px]">
                        <p>{t('home.completeYourTasks')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>{completedTasks} of {tasks.length} {t('home.tasksCompleted').replace('{completed}', '').replace('{total}', '').replace('of', '').replace('tasks completed', '').trim() || 'tasks completed'}</span>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <div className="divide-y">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer ${
                        task.status === 'overdue' ? 'bg-[#FFF0F3]' : ''
                      }`}
                    >
                      <Checkbox 
                        checked={task.checked} 
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <Link 
                        to={task.link || '#'} 
                        className="flex-1 flex items-center gap-3 min-w-0"
                      >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{t(task.titleKey)}</p>
                        <div className="flex items-center gap-1 text-xs">
                          {task.status === 'overdue' && (
                            <span className="text-[#E00021] flex items-center gap-1">
                              <Timer className="h-3 w-3" /> {t('home.overdue')} {task.dueDate}
                            </span>
                          )}
                          {task.status === 'completed' && (
                            <span className="text-green-600 flex items-center gap-1">
                              ✓ {t('home.completed')} <Timer className="h-3 w-3" /> {t('home.due')} {task.dueDate}
                            </span>
                          )}
                          {task.status === 'pending' && (
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Timer className="h-3 w-3" /> {t('home.due')} {task.dueDate}
                            </span>
                          )}
                        </div>
                        {task.mandatory && (
                          <span className="text-xs text-destructive">7 {t('home.mandatory')}</span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Recommended Actions - Middle Column */}
            <div className="col-span-full md:col-span-4 space-y-6">
            <Card className="rounded-[20px] border-[hsl(0_0%_84%)]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('home.recommendedActions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Completion */}
                <div className="text-center pb-6 border-b">
                  <h3 className="font-semibold mb-4">{t('home.profileCompletion')}</h3>
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
                  <p className="text-sm text-muted-foreground mb-2">{t('home.yourProfileIs').replace('{percentage}', '30')}</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {t('home.profileViewsBoost')}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/edit-company-profile">{t('home.editProfile')}</Link>
                  </Button>
                </div>

                {/* Capture More Leads */}
                <div className="text-center pb-6 border-b">
                  <h3 className="font-semibold mb-4">{t('home.captureMoreLeads')}</h3>
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('home.wantConnections')} <span className="text-xs">{t('home.additionalCostApplies')}</span>
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    {t('home.requestLeadBoosterInfo')}
                  </Button>
                </div>

                {/* Invite Your Customers */}
                <div className="pb-6 border-b">
                  <h3 className="font-semibold mb-4">{t('home.inviteYourCustomers')}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('home.invitesAllocated')}</span>
                        <span className="font-medium">46</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-900 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('home.customersViewed')}</span>
                        <span className="font-medium">38</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-700 rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('home.customersRegistered')}</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 mb-3">
                    {t('home.ensureUseInvites')}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/invite-customers">{t('home.inviteMoreCustomers')}</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    {t('home.lookingInviteMore')}{' '}
                    <a href="#" className="text-blue-600 hover:underline">{t('home.buyMoreInvites')}</a>
                  </p>
                </div>

                {/* Compare with Competitors */}
                <div>
                  <h3 className="font-semibold mb-4">{t('home.compareCompetitors')}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('home.yourProfileViews')}</span>
                        <span className="font-medium">267</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-900 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t('home.averageProfileViews')}</span>
                        <span className="font-medium">?</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-orange-300 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 mb-3 text-center">
                    {t('home.answerPendingQuestions')}
                  </p>
                  <div className="text-center">
                    <Button variant="outline">{t('home.unlockFullReport')}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Performance Snapshot - Right Column */}
            <div className="col-span-full md:col-span-4 space-y-6">
            <Card className="rounded-[20px] border-[hsl(0_0%_84%)]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('home.performanceSnapshot')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Views */}
                <div>
                  <h3 className="font-semibold mb-2">{t('home.profileViews')}</h3>
                  <p className="text-sm text-green-600 mb-4">{t('home.higherThanLastWeek')}</p>
                  
                  {/* Simple Bar Chart Placeholder */}
                  <div className="h-32 flex items-end gap-1 mb-2">
                    {[25, 30, 20, 35, 40, 30, 25, 20, 15, 45, 50, 35].map((height, i) => (
                      <div key={i} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">{t('home.weeksRemaining')}</p>
                  
                  <div className="text-center mt-4">
                    <Button variant="outline" asChild>
                      <Link to="/exhibitor-dashboard">{t('home.viewFullReport')}</Link>
                    </Button>
                  </div>
                </div>

                {/* Boost Your Visibility */}
                <div className="text-center pt-4 border-t">
                  <h4 className="font-medium mb-2">{t('home.boostVisibility')}</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t('home.standOutFromRest')} <span className="italic">{t('home.additionalCostApplies')}</span>
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    {t('home.askAboutPriority')}
                  </Button>
                </div>

                {/* Profile Viewers */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">{t('home.yourProfileViewers')}</h3>
                  <p className="text-xs text-muted-foreground text-center mb-3">({t('home.showing').replace('{shown}', '2').replace('{total}', '11')})</p>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-2 font-medium">{t('home.companyNameColumn')}</th>
                          <th className="text-right p-2 font-medium">{t('home.contactNo')}</th>
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
                    <div className="text-center py-2 text-xs text-muted-foreground">{t('home.more').replace('{count}', '9')}</div>
                  </div>
                  
                  <div className="text-center mt-4">
                    <Button variant="outline" asChild>
                      <Link to="/profile-viewer">{t('home.discoverMyViewers')}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </LayoutGrid>
        </PageContainer>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-8 py-8">
        <PageContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter mb-8">
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
              <h4 className="font-semibold mb-2">{t('footer.usefulLinks')}</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline">{t('footer.help')}</a></li>
                <li><a href="#" className="hover:underline">{t('footer.privacyPolicy')}</a></li>
                <li><a href="#" className="hover:underline">{t('footer.contactUs')}</a></li>
                <li><a href="#" className="hover:underline">{t('footer.meetTheTeam')}</a></li>
                <li><a href="#" className="hover:underline">{t('footer.safetyAtEvent')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t('footer.followUs')}</h4>
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
              <span className="font-semibold">{t('footer.privacyOptions')}</span>
              <a href="#" className="hover:underline">{t('footer.cookiePolicy')}</a>
              <a href="#" className="hover:underline">{t('footer.yourPrivacyChoices')}</a>
              <a href="#" className="hover:underline">{t('footer.rxGlobalPrivacyPolicy')}</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 RX Global</p>
            <p className="text-xs text-muted-foreground mt-2">
              The London Book Fair, RX, and Reed Exhibitions are trade marks of Reed Exhibitions Limited and its affiliates. RELX and the "RE" logo are trade marks of RELX Group plc, used under licence. Reed Exhibitions Limited is a private limited company, having its registered and principal office at Gateway House, 28 The Quadrant, Richmond, Surrey, TW9 1DN, registered in England and Wales with Company No. 678540. Business activity: Activities of exhibition and fair organisers VAT No. GB 232 4004 20 Tax ID No: 13960 00581
            </p>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
};

export default Home;
