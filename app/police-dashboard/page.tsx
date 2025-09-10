"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  MapPin,
  Bell,
  Users,
  Phone,
  Navigation,
  Search,
  FileText,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"

// Mock data for tourists and alerts
const mockTourists = [
  {
    id: "TST-2025-001234",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    emergencyContact: "+91 98765 43211",
    location: { lat: 32.2396, lng: 77.1887, name: "Manali, HP" },
    status: "active",
    lastSeen: "2 minutes ago",
    safetyScore: 78,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "TST-2025-001235",
    name: "Raj Kumar",
    phone: "+91 98765 43212",
    emergencyContact: "+91 98765 43213",
    location: { lat: 32.2432, lng: 77.1892, name: "Solang Valley, HP" },
    status: "alert",
    lastSeen: "5 minutes ago",
    safetyScore: 45,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "TST-2025-001236",
    name: "Anita Verma",
    phone: "+91 98765 43214",
    emergencyContact: "+91 98765 43215",
    location: { lat: 32.2456, lng: 77.1901, name: "Rohtang Pass, HP" },
    status: "emergency",
    lastSeen: "1 minute ago",
    safetyScore: 25,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockAlerts = [
  {
    id: "ALT-001",
    touristId: "TST-2025-001236",
    touristName: "Anita Verma",
    type: "emergency",
    severity: "high",
    title: "Emergency Panic Button Activated",
    description: "Tourist has activated emergency panic button. Immediate assistance required.",
    location: "Rohtang Pass, HP",
    timestamp: new Date(Date.now() - 60000),
    status: "active",
  },
  {
    id: "ALT-002",
    touristId: "TST-2025-001235",
    touristName: "Raj Kumar",
    type: "geo-fence",
    severity: "medium",
    title: "Restricted Area Entry",
    description: "Tourist has entered a restricted military zone. Monitoring required.",
    location: "Solang Valley, HP",
    timestamp: new Date(Date.now() - 300000),
    status: "investigating",
  },
  {
    id: "ALT-003",
    touristId: "TST-2025-001234",
    touristName: "Priya Sharma",
    type: "weather",
    severity: "low",
    title: "Weather Advisory",
    description: "Heavy snowfall warning issued for tourist location.",
    location: "Manali, HP",
    timestamp: new Date(Date.now() - 1800000),
    status: "resolved",
  },
]

// Real-time Map Component
function RealTimeMap() {
  const [selectedTourist, setSelectedTourist] = useState<string | null>(null)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Real-time Tourist Tracking
        </CardTitle>
        <CardDescription>Live location monitoring with heatmap clusters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg h-96 relative overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=600&text=Interactive+Heatmap+View"
              alt="Tourist Tracking Map"
              className="w-full h-full object-cover"
            />

            {/* Tourist Markers */}
            <div className="absolute top-4 left-4 bg-background/90 rounded-lg p-2">
              <div className="text-xs font-semibold mb-2">Active Tourists</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Safe (1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Caution (1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs">Emergency (1)</span>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-background/90 rounded-lg p-2">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-muted-foreground">Safe Tourists</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-muted-foreground">Need Attention</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-muted-foreground">Emergency</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Active Alerts Component
function ActiveAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      alert.touristName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.touristId.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSeverity && matchesStatus && matchesSearch
  })

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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>
      case "low":
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "investigating":
        return <Badge className="bg-yellow-500 text-white">Investigating</Badge>
      case "resolved":
        return <Badge variant="secondary">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Active Alerts
        </CardTitle>
        <CardDescription>Monitor and respond to tourist safety alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Tourist</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Severity</Label>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{alert.title}</h4>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        Tourist: {alert.touristName} ({alert.touristId})
                      </span>
                      <span>Location: {alert.location}</span>
                      <span>Time: {alert.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {alert.status === "active" && (
                      <Button size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Tourist Details Component
function TouristDetails() {
  const [selectedTourist, setSelectedTourist] = useState(mockTourists[0])

  const generateEFIR = () => {
    alert(
      `E-FIR generated for ${selectedTourist.name} (${selectedTourist.id})\nFIR Number: FIR-2025-${Date.now()}\nStatus: Draft created successfully`,
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Tourist Details
        </CardTitle>
        <CardDescription>View detailed information and generate reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Tourist Selection */}
          <div>
            <Label>Select Tourist</Label>
            <Select
              value={selectedTourist.id}
              onValueChange={(value) => {
                const tourist = mockTourists.find((t) => t.id === value)
                if (tourist) setSelectedTourist(tourist)
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockTourists.map((tourist) => (
                  <SelectItem key={tourist.id} value={tourist.id}>
                    {tourist.name} ({tourist.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Tourist Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedTourist.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {selectedTourist.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{selectedTourist.name}</h3>
                <p className="text-muted-foreground">ID: {selectedTourist.id}</p>
                <Badge
                  variant={
                    selectedTourist.status === "active"
                      ? "secondary"
                      : selectedTourist.status === "alert"
                        ? "default"
                        : "destructive"
                  }
                  className="mt-1"
                >
                  {selectedTourist.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{selectedTourist.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emergency Contact:</span>
                    <span>{selectedTourist.emergencyContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Seen:</span>
                    <span>{selectedTourist.lastSeen}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Location & Safety</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Location:</span>
                    <span>{selectedTourist.location.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span>
                      {selectedTourist.location.lat}, {selectedTourist.location.lng}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Safety Score:</span>
                    <span
                      className={
                        selectedTourist.safetyScore >= 70
                          ? "text-green-600"
                          : selectedTourist.safetyScore >= 40
                            ? "text-yellow-600"
                            : "text-red-600"
                      }
                    >
                      {selectedTourist.safetyScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={generateEFIR}>
              <FileText className="h-4 w-4 mr-2" />
              Generate E-FIR
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Contact Tourist
            </Button>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Track Location
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Statistics Dashboard
function StatsDashboard() {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Tourists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,247</div>
          <div className="text-xs text-green-600">+12% from yesterday</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">23</div>
          <div className="text-xs text-muted-foreground">2 high priority</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Emergency Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">5</div>
          <div className="text-xs text-muted-foreground">Last 24 hours</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Response Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">3.2m</div>
          <div className="text-xs text-muted-foreground">Average response</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PoliceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Police & Tourism Authority Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:flex">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              System Online
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>PD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Command Center</h1>
            <p className="text-muted-foreground">Real-time monitoring and emergency response for tourist safety</p>
          </div>

          <StatsDashboard />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="map">Live Map</TabsTrigger>
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="tourists">Tourist Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <RealTimeMap />
                <div className="space-y-6">
                  <ActiveAlerts />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <RealTimeMap />
            </TabsContent>

            <TabsContent value="alerts">
              <ActiveAlerts />
            </TabsContent>

            <TabsContent value="tourists">
              <TouristDetails />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
