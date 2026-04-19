"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Home, ArrowUpRight, MessageSquare, List, DollarSign, Clock, CheckCircle2, CreditCard, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const STATS = [
  { label: "Active Listings", value: "2", icon: List, color: "text-blue-500" },
  { label: "Pending Offers", value: "8", icon: ArrowUpRight, color: "text-accent" },
  { label: "Messages", value: "12", icon: MessageSquare, color: "text-primary" },
  { label: "Est. Revenue", value: "$4,250", icon: DollarSign, color: "text-green-600" },
];

const RECENT_ACTIVITY = [
  { id: 1, type: "offer", message: "Cash offer of $310k received for 452 Oak Avenue", time: "2 hours ago", status: "unread" },
  { id: 2, type: "message", message: "John Miller: 'Is the roof recently replaced?'", time: "5 hours ago", status: "read" },
  { id: 3, type: "valuation", message: "AI valuation updated for 88 Skyline Terrace", time: "Yesterday", status: "read" },
  { id: 4, type: "listing", message: "Property 452 Oak Avenue is now live", time: "2 days ago", status: "read" },
];

const COMMISSION_DATA = [
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 1800 },
  { month: "Mar", earnings: 3200 },
  { month: "Apr", earnings: 4500 },
  { month: "May", earnings: 2800 },
  { month: "Jun", earnings: 4250 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline text-primary">Profit Dashboard</h1>
            <p className="text-muted-foreground">Tracking your transaction fees and investor subscription revenue.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="rounded-full px-6">
              <Link href="/pricing">View Plan Details</Link>
            </Button>
            <Button asChild className="rounded-full px-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/list-property">
                <Home className="mr-2 h-4 w-4" /> Add New Listing
              </Link>
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <div>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly profit from 1.5% transaction commissions.</CardDescription>
              </div>
              <Badge variant="outline" className="h-8 px-3 rounded-full border-accent text-accent">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% vs last month
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMMISSION_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748B', fontSize: 12}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748B', fontSize: 12}}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      cursor={{fill: '#F1F5F9'}} 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="earnings" radius={[4, 4, 0, 0]} barSize={40}>
                      {COMMISSION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === COMMISSION_DATA.length - 1 ? '#2EE69D' : '#1F9BA6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Billing & Plan Side Card */}
          <div className="space-y-6">
            <Card className="shadow-sm border-primary/20 bg-primary/5">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-1">
                  <CardTitle className="text-lg">Pro Investor Tier</CardTitle>
                  <Badge className="bg-primary text-primary-foreground">Active</Badge>
                </div>
                <CardDescription>Recurring subscription: $199/mo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>AI Valuation Usage</span>
                    <span>18 / 50 used</span>
                  </div>
                  <Progress value={36} className="h-1.5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Priority Leads Access</span>
                    <span>Unlimited</span>
                  </div>
                  <Progress value={100} className="h-1.5 bg-gray-200" />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" className="w-full text-xs h-9 rounded-full bg-white" asChild>
                  <Link href="/pricing">
                    <CreditCard className="mr-2 h-3.5 w-3.5" /> Billing Settings
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Commission Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="font-bold">1.5%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Investor Sub</span>
                  <span className="font-bold">$199.00</span>
                </div>
                <div className="pt-2 border-t flex justify-between items-center">
                  <span className="font-medium">Total Lifetime Profit</span>
                  <span className="text-primary font-bold">$23,190</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
           {/* Activity Feed */}
           <Card className="lg:col-span-2 shadow-sm">
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
              <CardDescription>Monitor your deals nearing closure.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {RECENT_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                    <div className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center ${
                      activity.type === 'offer' ? 'bg-accent/10 text-accent' : 
                      activity.type === 'message' ? 'bg-primary/10 text-primary' : 'bg-gray-100'
                    }`}>
                      {activity.type === 'offer' ? <DollarSign className="h-5 w-5" /> : 
                       activity.type === 'message' ? <MessageSquare className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${activity.status === 'unread' ? 'font-bold' : 'text-muted-foreground'}`}>
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction Summary Card */}
          <section>
            <h2 className="text-xl font-bold font-headline mb-6 text-primary flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" /> Pending Commission
            </h2>
            <Card className="border-l-4 border-l-primary shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none">In Escrow</Badge>
                   <span className="text-xs text-muted-foreground">Payout: July 12</span>
                </div>
                <h4 className="font-bold text-lg mb-1">$4,650.00</h4>
                <p className="text-sm text-muted-foreground mb-4">452 Oak Avenue Closing</p>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span>Closing Progress</span>
                     <span className="font-medium">75%</span>
                   </div>
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4"></div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
