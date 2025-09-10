"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Shield,
  Upload,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

// DigiLocker OAuth Component
function DigiLockerAuth({ onSuccess }: { onSuccess: (data: any) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDigiLockerAuth = () => {
    setIsLoading(true)
    // Simulate DigiLocker OAuth flow
    setTimeout(() => {
      setIsLoading(false)
      onSuccess({
        name: "John Doe",
        aadhar: "****-****-1234",
        verified: true,
        userId: "DL" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      })
    }, 2000)
  }

  return (
    <Button
      onClick={handleDigiLockerAuth}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Connecting to DigiLocker...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4 mr-2" />
          Continue with DigiLocker
        </>
      )}
    </Button>
  )
}

// Document Upload Component
function DocumentUpload({ onUpload }: { onUpload: (type: string, file: File) => void }) {
  const [selectedDoc, setSelectedDoc] = useState<"aadhar" | "passport">("aadhar")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onUpload(selectedDoc, file)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Document Type</Label>
        <Select value={selectedDoc} onValueChange={(value: "aadhar" | "passport") => setSelectedDoc(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aadhar">Aadhar Card</SelectItem>
            <SelectItem value="passport">Passport</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="document-upload">Upload {selectedDoc === "aadhar" ? "Aadhar Card" : "Passport"}</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <input
            id="document-upload"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Label htmlFor="document-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (max 5MB)</p>
          </Label>
        </div>
      </div>
    </div>
  )
}

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
]

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
  })
  const [kycMethod, setKycMethod] = useState<"digilocker" | "upload" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [kycData, setKycData] = useState<any>(null)
  const [generatedUserId, setGeneratedUserId] = useState<string>("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDigiLockerSuccess = (data: any) => {
    setKycData(data)
    setGeneratedUserId(data.userId)
    setMessage({ type: "success", text: "DigiLocker verification successful! User ID generated: " + data.userId })
  }

  const handleDocumentUpload = (type: string, file: File) => {
    setIsLoading(true)
    // Simulate document processing
    setTimeout(() => {
      const userId = "UP" + Math.random().toString(36).substr(2, 9).toUpperCase()
      setGeneratedUserId(userId)
      setKycData({ type, fileName: file.name, verified: true, userId })
      setIsLoading(false)
      setMessage({ type: "success", text: `${type} uploaded successfully! User ID generated: ${userId}` })
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setMessage({
        type: "success",
        text: activeTab === "login" ? "Login successful!" : "Account created successfully!",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" />
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">SafeTourism</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 bg-secondary/80 text-secondary-foreground">
              Secure Authentication
            </Badge>
            <h1 className="text-2xl font-bold mb-2 text-foreground">Welcome to SafeTourism</h1>
            <p className="text-foreground/80">Secure your travel with blockchain-powered digital identity</p>
          </div>

          {message && (
            <Alert
              className={`mb-6 ${message.type === "error" ? "border-destructive bg-destructive/10" : "border-primary bg-primary/10"}`}
            >
              {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              <AlertDescription className="text-foreground">{message.text}</AlertDescription>
            </Alert>
          )}

          <Card className="border-border bg-card">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="login" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Choose Login Method</h3>

                    {/* DigiLocker OAuth */}
                    <DigiLockerAuth onSuccess={handleDigiLockerSuccess} />

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or use credentials</span>
                      </div>
                    </div>

                    {/* Traditional Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-foreground">
                          Email or Phone
                        </Label>
                        <Input
                          id="login-email"
                          type="text"
                          placeholder="Enter email or phone number"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-background border-input text-foreground"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-foreground">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="bg-background border-input text-foreground"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Create Your Account</h3>

                    {/* DigiLocker OAuth */}
                    <DigiLockerAuth onSuccess={handleDigiLockerSuccess} />

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or register manually</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-foreground">
                          Full Name
                        </Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-background border-input text-foreground"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-foreground">
                          Email Address
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-background border-input text-foreground"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-phone" className="text-foreground">
                          Phone Number
                        </Label>
                        <div className="flex gap-2">
                          <Select value={selectedCountryCode} onValueChange={setSelectedCountryCode}>
                            <SelectTrigger className="w-24 bg-background border-input">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {countryCodes.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.flag} {country.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            id="signup-phone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="flex-1 bg-background border-input text-foreground"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-foreground">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="bg-background border-input text-foreground"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password" className="text-foreground">
                          Confirm Password
                        </Label>
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="bg-background border-input text-foreground"
                          required
                        />
                      </div>

                      <div className="space-y-4 border-t pt-4">
                        <h4 className="font-semibold text-foreground">KYC Verification (Required)</h4>
                        <p className="text-sm text-muted-foreground">Choose your preferred verification method:</p>

                        <div className="space-y-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setKycMethod("digilocker")}
                            className="w-full justify-start bg-background border-input hover:bg-accent"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Verify via DigiLocker
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setKycMethod("upload")}
                            className="w-full justify-start bg-background border-input hover:bg-accent"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Upload Aadhar/Passport
                          </Button>
                        </div>

                        {kycMethod === "digilocker" && (
                          <div className="mt-4">
                            <DigiLockerAuth onSuccess={handleDigiLockerSuccess} />
                          </div>
                        )}

                        {kycMethod === "upload" && (
                          <div className="mt-4">
                            <DocumentUpload onUpload={handleDocumentUpload} />
                          </div>
                        )}

                        {generatedUserId && (
                          <Alert className="border-primary bg-primary/10">
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription className="text-foreground">
                              <strong>User ID Generated:</strong> {generatedUserId}
                              <br />
                              <span className="text-sm">Please save this ID for future reference.</span>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={isLoading || !kycData}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
