"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import {
  Shield,
  MapPin,
  Smartphone,
  Users,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lock,
  Zap,
  Globe,
  Phone,
  Mail,
} from "lucide-react"

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
        <div className="container mx-auto px-8 lg:px-16 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="group cursor-pointer logo-hover">
              <Shield className="h-8 w-8 text-primary transition-all duration-300 group-hover:text-accent" />
            </div>
            <span className="text-xl font-bold text-foreground transition-colors duration-300">SafeTourism</span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-sm font-medium text-foreground hover:text-secondary hover:scale-105 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("features")}
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-foreground hover:text-accent hover:scale-105 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("howItWorks")}
              </a>
              <a
                href="#stats"
                className="text-sm font-medium text-foreground hover:text-primary hover:scale-105 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("stats")}
              </a>
            </nav>
            <LanguageSelector />
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <Link href="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105 active:scale-95 border-secondary text-secondary bg-transparent"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {t("signup")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit bg-primary text-primary-foreground border-primary">
                  SIH 2025 Project
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight text-foreground">
                  {t("heroTitle")}
                </h1>
                <p className="text-xl text-foreground/80 text-pretty leading-relaxed">{t("heroSubtitle")}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="text-lg px-8 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {t("getStarted")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {t("learnMore")}
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-foreground/70">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{t("realTimeMonitoring")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{t("blockchainSecured")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{t("247Support")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12 transition-all duration-300">
                <img
                  src="/modern-tourist-safety-dashboard-with-maps-and-shie.jpg"
                  alt="Tourist Safety Dashboard"
                  className="w-full h-auto rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-full p-3 transition-all duration-300 hover:scale-110">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-muted/30 px-8 lg:px-16 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/indian-tourists-with-police-and-blockchain-securit.jpg"
                alt="Tourism Safety Challenge"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-balance text-foreground">{t("problemTitle")}</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">{t("problemDescription")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{t("safetyGaps")}</h3>
                    <p className="text-sm text-foreground/70">{t("remoteAreasLackProperMonitoring")}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{t("slowResponse")}</h3>
                    <p className="text-sm text-foreground/70">{t("emergencyResponseTimesAreCritical")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section id="stats" className="py-20 px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t("statsTitle")}</h2>
            <p className="text-lg text-foreground/80">{t("statsDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4 transition-colors duration-300" />
                <CardTitle className="text-3xl font-bold text-foreground">
                  <AnimatedCounter end={4320} suffix="+" />
                </CardTitle>
                <CardDescription className="text-foreground/70">{t("touristsProtected")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:scale-105 border-secondary/20">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-secondary mx-auto mb-4 transition-colors duration-300" />
                <CardTitle className="text-3xl font-bold text-foreground">
                  <AnimatedCounter end={1200} suffix="+" />
                </CardTitle>
                <CardDescription className="text-foreground/70">{t("alertsProcessed")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:scale-105 border-accent/20">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mx-auto mb-4 transition-colors duration-300" />
                <CardTitle className="text-3xl font-bold text-foreground">
                  <AnimatedCounter end={50} suffix="+" />
                </CardTitle>
                <CardDescription className="text-foreground/70">{t("authoritiesConnected")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30 px-8 lg:px-16 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{t("howItWorks")}</h2>
            <p className="text-lg text-foreground/80">Four simple steps to ensure your safety while traveling</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
              <CardHeader className="text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all duration-300">
                  1
                </div>
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-4 mt-4 transition-colors duration-300" />
                <CardTitle className="text-foreground">{t("digitalTouristID")}</CardTitle>
                <CardDescription>
                  Secure blockchain-based ID created at entry point with biometric verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
              <CardHeader className="text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all duration-300">
                  2
                </div>
                <Eye className="h-12 w-12 text-primary mx-auto mb-4 mt-4 transition-colors duration-300" />
                <CardTitle className="text-foreground">{t("smartMonitoring")}</CardTitle>
                <CardDescription>AI detects anomalies and sends geo-fence alerts for enhanced safety</CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
              <CardHeader className="text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all duration-300">
                  3
                </div>
                <Phone className="h-12 w-12 text-primary mx-auto mb-4 transition-colors duration-300" />
                <CardTitle className="text-foreground">{t("emergencyResponse")}</CardTitle>
                <CardDescription>
                  Panic button instantly connects to nearest police and emergency services
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 border-primary/20">
              <CardHeader className="text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all duration-300">
                  4
                </div>
                <Lock className="h-12 w-12 text-primary mx-auto mb-4 transition-colors duration-300" />
                <CardTitle className="text-foreground">{t("privacyFirst")}</CardTitle>
                <CardDescription>Blockchain encryption ensures safe travel records and data protection</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Highlights Section */}
      <section id="features" className="py-20 px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Advanced Technology Stack</h2>
            <p className="text-lg text-foreground/80">Cutting-edge features for comprehensive tourist safety</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">{t("aiPoweredAnomalyDetection")}</CardTitle>
                <CardDescription>
                  Machine learning algorithms detect unusual patterns and potential threats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">{t("blockchainSecuredDigitalIDs")}</CardTitle>
                <CardDescription>Immutable tourist identification with cryptographic security</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">{t("geoFencingRealTimeAlerts")}</CardTitle>
                <CardDescription>Location-based safety zones with instant notifications</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">{t("multiLanguageSupport")}</CardTitle>
                <CardDescription>Face recognition and support for 10+ Indian languages</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30 px-8 lg:px-16 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What People Say</h2>
            <p className="text-lg text-foreground/80">Feedback from tourists and authorities using our system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "The real-time monitoring gave me peace of mind while trekking in remote areas. The emergency response
                  was incredibly fast when I needed help."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">Adventure Tourist</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "As a police officer, this system has revolutionized how we respond to tourist emergencies. The
                  digital ID verification is seamless and secure."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Inspector Raj Kumar</p>
                    <p className="text-sm text-muted-foreground">Tourism Police</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  "The blockchain-based ID system has streamlined our tourist registration process while ensuring
                  complete data privacy and security."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Anita Verma</p>
                    <p className="text-sm text-muted-foreground">Tourism Department</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-8 lg:px-16 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SafeTourism</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart Tourist Safety Monitoring & Incident Response System for secure travel across India.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Data Protection
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@safetourism.gov.in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 1800-XXX-XXXX</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 SafeTourism. SIH'25 Project. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline">SIH 2025</Badge>
              <span className="text-sm text-muted-foreground">Government of India Initiative</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
