"use client"

import Link from "next/link"
import { ArrowRight, Brain, Mic, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center gap-4 pb-12 pt-10 md:py-20 lg:py-32">
          <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              NeuroLab Documentation
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Comprehensive documentation for the EEG & Voice Mental State Analysis Platform.
              Build powerful neurotechnology applications with multimodal AI.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/docs">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/api">
              <Button variant="outline" size="lg">
                API Reference
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:gap-8 lg:grid-cols-4">
            <div className="relative overflow-hidden rounded-lg border bg-background p-8">
              <div className="flex h-[180px] flex-col justify-between">
                <Brain className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">EEG Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time brain signal processing with advanced ML models
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-8">
              <div className="flex h-[180px] flex-col justify-between">
                <Mic className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Voice Emotion</h3>
                  <p className="text-sm text-muted-foreground">
                    Audio emotion detection mapped to mental states
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-8">
              <div className="flex h-[180px] flex-col justify-between">
                <Activity className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Multimodal</h3>
                  <p className="text-sm text-muted-foreground">
                    Combine EEG and voice for comprehensive analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-8">
              <div className="flex h-[180px] flex-col justify-between">
                <Zap className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time</h3>
                  <p className="text-sm text-muted-foreground">
                    Stream and analyze data in real-time via WebSocket
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Quick Links
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Jump right into what you need
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
            <Link href="/docs/quick-start" className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-accent">
              <div className="space-y-2">
                <h3 className="font-bold">Quick Start</h3>
                <p className="text-sm text-muted-foreground">
                  Get up and running in minutes
                </p>
              </div>
            </Link>
            <Link href="/docs/installation/docker" className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-accent">
              <div className="space-y-2">
                <h3 className="font-bold">Docker Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Deploy with Docker Compose
                </p>
              </div>
            </Link>
            <Link href="/docs/api/ai-service" className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-accent">
              <div className="space-y-2">
                <h3 className="font-bold">AI API</h3>
                <p className="text-sm text-muted-foreground">
                  Explore the AI service endpoints
                </p>
              </div>
            </Link>
            <Link href="/docs/guides/streaming" className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-accent">
              <div className="space-y-2">
                <h3 className="font-bold">Real-time Streaming</h3>
                <p className="text-sm text-muted-foreground">
                  Stream EEG data in real-time
                </p>
              </div>
            </Link>
            <Link href="/docs/concepts/mental-states" className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-accent">
              <div className="space-y-2">
                <h3 className="font-bold">Mental States</h3>
                <p className="text-sm text-muted-foreground">
                  Understand the classification system
                </p>
              </div>
            </Link>
            <Link href="/docs/guides/training" className="group relative overflow-hidden rounded-lg border bg-background p-8 hover:bg-accent">
              <div className="space-y-2">
                <h3 className="font-bold">Model Training</h3>
                <p className="text-sm text-muted-foreground">
                  Train custom ML models
                </p>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for NeuroLab. Documentation powered by Next.js.
          </p>
        </div>
      </footer>
    </div>
  )
}
