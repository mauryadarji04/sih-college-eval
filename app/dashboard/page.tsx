"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Shield,
  Bell,
  User,
  Calendar,
  Settings,
  AlertTriangle,
  CheckCircle,
  Phone,
  Clock,
  Eye,
  Globe,
  Menu,
  X,
  Languages,
  Hospital,
  Car,
  Plus,
  Save,
  Send,
  Map,
  Plane,
  BellRing,
} from "lucide-react"

// Floating Panic Button Component
function PanicButton() {
  const [isPressed, setIsPressed] = useState(false)

  const handlePanicPress = () => {
    setIsPressed(true)
    // Simulate emergency call
    setTimeout(() => {
      alert("Emergency services contacted! Help is on the way.")
      setIsPressed(false)
    }, 2000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        onClick={handlePanicPress}
        disabled={isPressed}
        className="h-16 w-16 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg animate-pulse"
      >
        {isPressed ? <Phone className="h-8 w-8 animate-bounce" /> : <AlertTriangle className="h-8 w-8" />}
      </Button>
    </div>
  )
}

// Safety Score Component
function SafetyScore({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Safety Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</div>
            <p className="text-sm text-muted-foreground">{getScoreLabel(score)}</p>
          </div>
          <Progress value={score} className="h-3" />
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold">Location</div>
              <div className="text-green-600">Safe</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Weather</div>
              <div className="text-green-600">Clear</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Network</div>
              <div className="text-yellow-600">Weak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Geo-Fencing Alerts Component
function GeoFencingAlerts() {
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Weather Alert - Heavy Rain Expected",
      description: "Meteorological department warns of heavy rainfall in next 2 hours. Seek shelter.",
      time: "5 minutes ago",
      severity: "high",
      priority: 1,
    },
    {
      id: 2,
      type: "info",
      title: "Tourist Safety Zone Entry",
      description: "You have entered a designated tourist safety zone with 24/7 monitoring.",
      time: "15 minutes ago",
      severity: "low",
      priority: 3,
    },
    {
      id: 3,
      type: "alert",
      title: "Road Closure Alert",
      description: "Main highway to Rohtang Pass temporarily closed due to landslide.",
      time: "1 hour ago",
      severity: "medium",
      priority: 2,
    },
  ]

  const sortedAlerts = alerts.sort((a, b) => a.priority - b.priority)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-destructive bg-destructive/5"
      case "medium":
        return "border-yellow-500 bg-yellow-500/5"
      case "low":
        return "border-primary bg-primary/5"
      default:
        return "border-border"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "medium":
        return <Eye className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-primary" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-primary" />
          Safety Alerts
          <Badge variant="destructive" className="ml-auto animate-pulse">
            {sortedAlerts.filter((alert) => alert.severity === "high").length} High Priority
          </Badge>
        </CardTitle>
        <CardDescription>Weather-based and location alerts (Priority sorted)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAlerts.map((alert) => (
            <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      Priority {alert.priority}
                    </Badge>
                  </div>
                  <AlertDescription className="mt-1">{alert.description}</AlertDescription>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Live Location Preview Component
function LiveLocationPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          Current Location Map
        </CardTitle>
        <CardDescription>Real-time location with safety indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
            <img
              src="/placeholder.svg?height=250&width=500&text=Live+Interactive+Map+with+Current+Location"
              alt="Current Location Map"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-background/90 rounded-lg p-2">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Tracking</span>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 bg-background/90 rounded-lg p-2">
              <div className="text-xs font-semibold">Manali, Himachal Pradesh</div>
              <div className="text-xs text-muted-foreground">28.2699° N, 77.2124° E</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold">Safety Zone Status</div>
              <div className="text-green-600">Safe Area</div>
            </div>
            <div>
              <div className="font-semibold">Nearest Police</div>
              <div className="text-muted-foreground">1.2 km away</div>
            </div>
            <div>
              <div className="font-semibold">Emergency Services</div>
              <div className="text-green-600">Available 24/7</div>
            </div>
            <div>
              <div className="font-semibold">Network Signal</div>
              <div className="text-yellow-600">Moderate (3/5)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Quick Actions Component
function QuickActions() {
  const quickActions = [
    { id: "translate", label: "Translate", icon: Languages, color: "bg-blue-500" },
    { id: "police", label: "Local Police", icon: Shield, color: "bg-red-500" },
    { id: "hospital", label: "Hospital", icon: Hospital, color: "bg-green-500" },
  ]

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case "translate":
        alert("Opening translator...")
        break
      case "police":
        alert("Connecting to local police station...")
        break
      case "hospital":
        alert("Finding nearest hospital...")
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="outline"
                onClick={() => handleQuickAction(action.id)}
                className="flex flex-col gap-2 h-20 bg-background hover:bg-accent"
              >
                <div className={`p-2 rounded-full ${action.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// My Trips Component
function MyTrips() {
  const trips = [
    {
      id: "BLK-2025-001",
      destination: "Manali Adventure",
      startDate: "Jan 15, 2025",
      endDate: "Jan 22, 2025",
      status: "active",
      safetyScore: 78,
    },
    {
      id: "BLK-2024-089",
      destination: "Goa Beach Holiday",
      startDate: "Dec 20, 2024",
      endDate: "Dec 27, 2024",
      status: "completed",
      safetyScore: 95,
    },
    {
      id: "BLK-2024-067",
      destination: "Kerala Backwaters",
      startDate: "Nov 10, 2024",
      endDate: "Nov 17, 2024",
      status: "completed",
      safetyScore: 88,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          My Trips
        </CardTitle>
        <CardDescription>Your travel history and current trips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{trip.destination}</h4>
                <Badge variant={trip.status === "active" ? "default" : "secondary"}>{trip.status}</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {trip.startDate} - {trip.endDate}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Trip ID: {trip.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Safety Score:</span>
                  <Badge variant="outline" className="text-xs">
                    {trip.safetyScore}%
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Add Itinerary Component
function AddItinerary() {
  const [itineraryData, setItineraryData] = useState({
    startDate: "",
    endDate: "",
    destination: "",
    emergencyContact: "",
    dayWiseItinerary: "",
  })
  const [isDraft, setIsDraft] = useState(false)
  const [generatedTripId, setGeneratedTripId] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setItineraryData((prev) => ({ ...prev, [field]: value }))
  }

  const generateTripId = () => {
    return "BLK-" + new Date().getFullYear() + "-" + Math.random().toString(36).substr(2, 6).toUpperCase()
  }

  const handleSaveDraft = () => {
    setIsDraft(true)
    const tripId = generateTripId()
    setGeneratedTripId(tripId)
    alert(`Draft saved with Trip ID: ${tripId}`)
  }

  const handleConfirmItinerary = () => {
    const tripId = generatedTripId || generateTripId()
    setGeneratedTripId(tripId)
    alert(`Itinerary confirmed! Blockchain Trip ID: ${tripId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add Itinerary
        </CardTitle>
        <CardDescription>Plan your trip with blockchain-secured unique ID</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Trip Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={itineraryData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="bg-background border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">Trip End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={itineraryData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="bg-background border-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Enter destination"
              value={itineraryData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-contact">Emergency Contact</Label>
            <Input
              id="emergency-contact"
              placeholder="Emergency contact number"
              value={itineraryData.emergencyContact}
              onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
              className="bg-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="day-wise">Day-wise Itinerary</Label>
            <Textarea
              id="day-wise"
              placeholder="Day 1: Arrival and check-in&#10;Day 2: Local sightseeing&#10;Day 3: Adventure activities..."
              value={itineraryData.dayWiseItinerary}
              onChange={(e) => handleInputChange("dayWiseItinerary", e.target.value)}
              className="bg-background border-input min-h-24"
            />
          </div>

          {generatedTripId && (
            <Alert className="border-primary bg-primary/10">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Blockchain Trip ID Generated:</strong> {generatedTripId}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveDraft} className="flex-1 bg-background hover:bg-accent">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleConfirmItinerary} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Confirm Itinerary
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Safety Score Component
function RecentNotifications() {
  const notifications = [
    {
      id: 1,
      title: "Digital ID Verified",
      description: "Your blockchain-based tourist ID has been successfully verified.",
      time: "10 minutes ago",
      type: "success",
    },
    {
      id: 2,
      title: "Travel Itinerary Updated",
      description: "Your travel plan for tomorrow has been automatically updated.",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 3,
      title: "Safety Check-in Reminder",
      description: "Please check-in to confirm your safety status.",
      time: "3 hours ago",
      type: "warning",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border">
              {getTypeIcon(notification.type)}
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {notification.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function TouristDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Shield },
    { id: "profile", label: "Digital ID", icon: User },
    { id: "trips", label: "My Trips", icon: Plane },
    { id: "itinerary", label: "Add Itinerary", icon: Calendar },
    { id: "alerts", label: "Safety Alerts", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <LiveLocationPreview />
                <GeoFencingAlerts />
              </div>
              <div className="space-y-6">
                <SafetyScore score={78} />
                <QuickActions />
                <RecentNotifications />
              </div>
            </div>
          </div>
        )
      case "trips":
        return <MyTrips />
      case "itinerary":
        return <AddItinerary />
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Digital Tourist ID</CardTitle>
              <CardDescription>Your blockchain-secured digital identity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">Priya Sharma</h3>
                    <p className="text-muted-foreground">Tourist ID: TST-2025-001234</p>
                    <Badge variant="secondary" className="mt-2">
                      Verified via DigiLocker
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span> priya.sharma@email.com
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> +91 98765 43210
                      </div>
                      <div>
                        <span className="font-medium">Aadhar:</span> ****-****-1234
                      </div>
                      <div>
                        <span className="font-medium">Nationality:</span> Indian
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Travel Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Current Location:</span> Manali, HP
                      </div>
                      <div>
                        <span className="font-medium">Check-in Date:</span> Jan 15, 2025
                      </div>
                      <div>
                        <span className="font-medium">Active Trip ID:</span> BLK-2025-001
                      </div>
                      <div>
                        <span className="font-medium">Travel Type:</span> Adventure Tourism
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "alerts":
        return <GeoFencingAlerts />
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your safety preferences and app settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Theme</h4>
                    <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <ThemeToggle />
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Language Preferences</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada"].map(
                      (lang) => (
                        <Button
                          key={lang}
                          variant="outline"
                          size="sm"
                          className="justify-start bg-background hover:bg-accent"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          {lang}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Safety Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Notifications</span>
                        <p className="text-xs text-muted-foreground">Receive safety alerts and updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real-time location sharing</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emergency contact notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Geo-fence alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weather-based alerts</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">SafeTourism Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex">
              Status: Active
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold capitalize">
                {activeSection === "trips" ? "My Trips" : activeSection}
              </h1>
              <p className="text-muted-foreground">
                {activeSection === "overview" && "Monitor your safety status and recent activities"}
                {activeSection === "profile" && "View and manage your digital tourist identity"}
                {activeSection === "trips" && "View your travel history and manage current trips"}
                {activeSection === "itinerary" && "Plan new trips with blockchain-secured unique IDs"}
                {activeSection === "alerts" && "Stay informed about safety notifications"}
                {activeSection === "settings" && "Customize your safety preferences"}
              </p>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>

      {/* Floating Panic Button */}
      <PanicButton />

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
