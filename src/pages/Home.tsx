import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Timer, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/exhibitor/MainNav";
import { TopBar } from "@/components/exhibitor/TopBar";
import { PageContainer, LayoutGrid } from "@/components/layout/LayoutGrid";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footer } from "@/components/Footer";
import chartPictogram from "@/assets/chart-pictogram.svg";

interface Task {
  id: string;
  titleKey: string;
  status: "overdue" | "completed" | "pending";
  dueDate: string;
  mandatory?: boolean;
  checked: boolean;
  link?: string;
}

const Home = () => {
  const [eventEdition, setEventEdition] = useState("2025");
  const { t } = useLanguage();

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      titleKey: "task.editCompanyProfile",
      status: "overdue",
      dueDate: "24th Jan 2026",
      checked: false,
      link: "/edit-company-profile",
    },
    {
      id: "2",
      titleKey: "task.manageSharers",
      status: "overdue",
      dueDate: "6th Feb 2026",
      checked: false,
      link: "/manage-shares",
    },
    {
      id: "3",
      titleKey: "task.adminMarketingOperations",
      status: "pending",
      dueDate: "14th Feb 2026",
      mandatory: true,
      checked: false,
      link: "/admin-marketing-operations",
    },
    {
      id: "4",
      titleKey: "task.inviteCustomers",
      status: "completed",
      dueDate: "16th Feb 2026",
      checked: true,
      link: "/invite-customers",
    },
    {
      id: "5",
      titleKey: "task.manageBadges",
      status: "completed",
      dueDate: "24th Jan 2026",
      checked: true,
      link: "/your-company-badges",
    },
    { id: "6", titleKey: "task.createOfferToCapture", status: "completed", dueDate: "24th Jan 2026", checked: true },
    { id: "7", titleKey: "task.viewExhibitorManual", status: "pending", dueDate: "1st Mar 2026", checked: false },
    { id: "8", titleKey: "task.customTaskOperations", status: "pending", dueDate: "1st Mar 2026", checked: false },
    { id: "9", titleKey: "task.exploreTheShop", status: "completed", dueDate: "3rd Mar 2026", checked: true },
    { id: "10", titleKey: "task.upgradePackage", status: "completed", dueDate: "3rd Mar 2026", checked: true },
    { id: "11", titleKey: "task.setUpMeetings", status: "pending", dueDate: "9th Mar 2026", checked: false },
    { id: "12", titleKey: "task.uploadDocuments", status: "pending", dueDate: "9th Mar 2026", checked: false },
    { id: "13", titleKey: "task.setUpLeadManagerApp", status: "pending", dueDate: "9th Mar 2026", checked: false },
  ]);


  const completedTasks = tasks.filter((t) => t.checked).length;
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const newChecked = !task.checked;
        let newStatus: Task["status"];
        if (newChecked) {
          newStatus = "completed";
        } else {
          newStatus = task.status === "completed" ? "pending" : task.status;
        }

        return { ...task, checked: newChecked, status: newStatus };
      }),
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <TopBar
        eventName="The London Book Fair"
        eventDates="10-12 March 2026"
        eventLocation="Olympia London"
        eventEdition={eventEdition}
        onEventEditionChange={setEventEdition}
      />
      <MainNav />

      <main className="py-6 flex-1">
        <PageContainer>
          <LayoutGrid>
            {/* Task Progress - Left Column */}
            <div className="col-span-full md:col-span-4">
              <Card className="rounded-[20px] border-[hsl(0_0%_84%)]">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{t("home.taskProgress")}</CardTitle>
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
                          <p>{t("home.completeYourTasks")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span>
                      {completedTasks} of {tasks.length}{" "}
                      {t("home.tasksCompleted")
                        .replace("{completed}", "")
                        .replace("{total}", "")
                        .replace("of", "")
                        .replace("tasks completed", "")
                        .trim() || "tasks completed"}
                    </span>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  <div className="divide-y">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer ${
                          task.status === "overdue" ? "bg-[#FFF0F3]" : ""
                        }`}
                      >
                        <Checkbox checked={task.checked} onCheckedChange={() => toggleTask(task.id)} />
                        <Link to={task.link || "#"} className="flex-1 flex items-center gap-3 min-w-0">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{t(task.titleKey)}</p>
                            <div className="flex items-center gap-1 text-xs">
                              {task.status === "overdue" && (
                                <span className="text-[#E00021] flex items-center gap-1">
                                  <Timer className="h-3 w-3" /> {t("home.overdue")} {task.dueDate}
                                </span>
                              )}
                              {task.status === "completed" && (
                                <span className="text-green-600 flex items-center gap-1">
                                  ✓ {t("home.completed")} <Timer className="h-3 w-3" /> {t("home.due")} {task.dueDate}
                                </span>
                              )}
                              {task.status === "pending" && (
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Timer className="h-3 w-3" /> {t("home.due")} {task.dueDate}
                                </span>
                              )}
                            </div>
                            {task.mandatory && (
                              <span className="text-xs text-destructive">7 {t("home.mandatory")}</span>
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
            <div className="col-span-full md:col-span-4 space-y-[18px]">
              <h2 className="text-lg font-semibold">{t("home.recommendedActions")}</h2>
              
              {/* Lead Manager App Card */}
              <Card className="rounded-[20px] border-[hsl(0_0%_84%)] bg-white">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold mb-4">{t("home.leadManagerApp")}</h3>
                  <div className="mb-4">
                    <img 
                      src={chartPictogram} 
                      alt="Lead Manager" 
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("home.delegatesLoggedIn")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("home.customQuestionsCreated")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("home.addQualifyingQuestions")}
                  </p>
                  <Button variant="outline">
                    {t("home.setupLeadManagerApp")}
                  </Button>
                </CardContent>
              </Card>

              {/* Lead Booster Card */}
              <Card className="rounded-[20px] border-[hsl(0_0%_84%)] bg-white">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold mb-4">{t("home.leadBooster")}</h3>
                  <div className="mb-4">
                    <img 
                      src={chartPictogram} 
                      alt="Lead Booster" 
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <p className="text-sm font-medium mb-1">{t("home.yourOffer")}:</p>
                  <p className="text-sm text-muted-foreground mb-4 px-4">
                    "{t("home.offerPlaceholder")}"
                  </p>
                  <Button variant="outline">
                    {t("home.setupLeadBooster")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Performance Snapshot - Right Column */}
            <div className="col-span-full md:col-span-4 space-y-[18px]">
              <h2 className="text-lg font-semibold">{t("home.performanceSnapshot")}</h2>
              
              {/* Leads Download Card */}
              <Card className="rounded-[20px] border-[hsl(0_0%_84%)] bg-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">{t("home.leadsDownload")}</h3>
                  
                  <div className="flex items-center gap-6">
                    {/* Donut Chart */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="hsl(0 0% 90%)"
                          strokeWidth="12"
                          fill="none"
                        />
                        {/* 40% Unrated - Coral Rose #DA627D */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#DA627D"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="100.53 251.33"
                          strokeDashoffset="0"
                        />
                        {/* 20% 3 star - Royal Violet #7B2CBF */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#7B2CBF"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="50.27 251.33"
                          strokeDashoffset="-100.53"
                        />
                        {/* 20% 2 star - Herbal Green #6A994E */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#6A994E"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="50.27 251.33"
                          strokeDashoffset="-150.80"
                        />
                        {/* 20% 4 star - Amber #F4A261 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#F4A261"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray="50.27 251.33"
                          strokeDashoffset="-201.06"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">234</span>
                    </div>
                    
                    {/* Legend */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#DA627D" }}></span>
                        <span className="font-medium">40%</span>
                        <span className="text-muted-foreground">{t("home.unrated")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7B2CBF" }}></span>
                        <span className="font-medium">20%</span>
                        <span className="text-muted-foreground">{t("home.threeStar")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6A994E" }}></span>
                        <span className="font-medium">20%</span>
                        <span className="text-muted-foreground">{t("home.twoStar")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F4A261" }}></span>
                        <span className="font-medium">20%</span>
                        <span className="text-muted-foreground">{t("home.fourStar")}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4 mb-4 text-center">
                    {t("home.nudgeBoothTeam")}
                  </p>
                  <div className="text-center">
                    <Button variant="outline">
                      {t("home.downloadMyLeads")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lead Capture Performance Card */}
              <Card className="rounded-[20px] border-[hsl(0_0%_84%)] bg-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">{t("home.leadCapturePerformance")}</h3>
                  
                  {/* Bar Chart */}
                  <div className="flex items-end justify-center gap-8 h-32 mb-4">
                    {/* Day 1 */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-14 rounded-t" 
                        style={{ backgroundColor: "#E36414", height: "75px" }}
                      ></div>
                      <span className="text-sm mt-2 text-muted-foreground">{t("home.day")} 1</span>
                      <span className="text-xs text-muted-foreground">326 {t("home.leads")}</span>
                    </div>
                    {/* Day 2 - Highlighted */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-14 rounded-t" 
                        style={{ backgroundColor: "#E36414", height: "100px" }}
                      ></div>
                      <span className="text-sm mt-2 font-medium" style={{ color: "#E36414" }}>{t("home.day")} 2</span>
                      <span className="text-xs font-medium" style={{ color: "#E36414" }}>544 {t("home.leads")}</span>
                    </div>
                    {/* Day 3 - Empty/grey */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-14 rounded-t bg-muted" 
                        style={{ height: "12px" }}
                      ></div>
                      <span className="text-sm mt-2 text-muted-foreground">{t("home.day")} 3</span>
                      <span className="text-xs text-muted-foreground invisible">-</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    {t("home.teamCapturedToday")}
                  </p>
                  <div className="text-center">
                    <Button variant="outline">
                      {t("home.viewFullReport")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </LayoutGrid>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
