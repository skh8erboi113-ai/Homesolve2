'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  Plus,
  Mail,
  Calculator,
  FileText,
  TrendingUp,
  History,
  MessageSquare,
  ClipboardCheck,
  ChevronRight
} from "lucide-react";
import { generateProbateOutreach, ProbateOutreachOutput } from "@/ai/flows/probate-outreach-flow";
import { calculateWholesaleValuation } from "@/ai/flows/wholesale-valuation-flow";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

interface ProbateLead {
  id: string;
  deceasedName: string;
  propertyAddress: string;
  representativeName: string;
  representativePhone: string;
  representativeEmail: string;
  status: 'NEW' | 'SKIP_TRACED' | 'CONTACTED' | 'UNDER_CONTRACT' | 'SOLD';
  estimatedARV?: number;
  estimatedRepairs?: number;
  wholesaleOfferPrice?: number;
  notes: string;
}

const INITIAL_LEADS: ProbateLead[] = [
  {
    id: '1',
    deceasedName: 'John Doe',
    propertyAddress: '123 Maple St, Springfield',
    representativeName: 'Jane Smith (Daughter)',
    representativePhone: '',
    representativeEmail: '',
    status: 'NEW',
    notes: 'Found in county probate records.'
  },
  {
    id: '2',
    deceasedName: 'Robert Wilson',
    propertyAddress: '456 Oak Ave, Riverside',
    representativeName: 'Alice Wilson (Wife)',
    representativePhone: '555-0102',
    representativeEmail: 'alice@example.com',
    status: 'SKIP_TRACED',
    notes: 'Skip traced via TruePeopleSearch.'
  }
];

export default function ProbateDashboard() {
  const [leads, setLeads] = useState<ProbateLead[]>(INITIAL_LEADS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [_selectedLead, setSelectedLead] = useState<ProbateLead | null>(null);
  const [outreachResult, setOutreachResult] = useState<ProbateOutreachOutput | null>(null);
  const [newLead, setNewLead] = useState<Partial<ProbateLead>>({
    deceasedName: '',
    propertyAddress: '',
    representativeName: '',
    status: 'NEW'
  });
  const { toast } = useToast();

  const handleAddLead = () => {
    const lead: ProbateLead = {
      ...newLead as ProbateLead,
      id: Math.random().toString(36).substr(2, 9),
      representativePhone: '',
      representativeEmail: '',
      notes: '',
      status: 'NEW'
    };
    setLeads([...leads, lead]);
    setIsAddDialogOpen(false);
    toast({ title: "Lead Added", description: "The probate lead has been saved." });
  };

  const handleSkipTrace = (id: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'SKIP_TRACED', representativePhone: '555-123-4567', representativeEmail: 'rep@example.com' } : l));
    toast({ title: "Skip Tracing Complete", description: "Contact info updated for lead." });
  };

  const handleGenerateOutreach = async (lead: ProbateLead) => {
    toast({ title: "Generating Outreach...", description: "AI is crafting an empathetic message." });
    try {
        const result = await generateProbateOutreach({
            deceasedName: lead.deceasedName,
            representativeName: lead.representativeName,
            propertyAddress: lead.propertyAddress,
            targetPlatform: "SMS"
        });
        setOutreachResult(result);
        setSelectedLead(lead);
    } catch (_e) {
        toast({ title: "Error", description: "Failed to generate outreach.", variant: "destructive" });
    }
  };

  const handleValuation = async (id: string) => {
      const lead = leads.find(l => l.id === id);
      if (!lead) return;

      toast({ title: "Calculating Valuation...", description: "Applying the institutional 90% rule." });

      try {
          const result = await calculateWholesaleValuation({
              propertyAddress: lead.propertyAddress,
              estimatedARV: 350000, // Simulated default
              estimatedRepairs: 40000 // Simulated default
          });

          setLeads(leads.map(l => l.id === id ? {
              ...l,
              estimatedARV: result.arv,
              estimatedRepairs: result.repairCosts,
              wholesaleOfferPrice: result.wholesaleOffer
          } : l));

          toast({
              title: "Valuation Complete",
              description: `Offer: ${result.wholesaleOffer.toLocaleString()} | Spread: ${result.potentialAssignmentFee.toLocaleString()}`
          });
      } catch (_e) {
          toast({ title: "Error", description: "Valuation failed.", variant: "destructive" });
      }
  };

  const handleGenerateContract = (lead: ProbateLead) => {
      const contract = `
PURCHASE AND SALE AGREEMENT (Option Period)
------------------------------------------
Date: ${new Date().toLocaleDateString()}
Seller: ${lead.representativeName} (Representative of ${lead.deceasedName})
Buyer: HomeSolve Wholesaling LLC (and/or Assigns)
Property: ${lead.propertyAddress}
Price: $${(lead.wholesaleOfferPrice || 0).toLocaleString()}
Option Period: 7 Days (Inspection & Investor Approval)
Closing: Within 30 days of Option Expiry
      `;

      const blob = new Blob([contract], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Agreement-${lead.deceasedName.replace(' ', '-')}.txt`;
      a.click();

      setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'UNDER_CONTRACT' } : l));
      toast({ title: "Contract Generated", description: "Purchase agreement with 7-day option period created." });
  };

  return (
    <div className="min-h-screen bg-[#EEF4F5] p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-[#1F9BA6] text-white">VIRTUAL WHOLESALING</Badge>
                <Badge variant="outline" className="border-[#2EE69D] text-[#1F9BA6]">PROBATE AGENT</Badge>
            </div>
            <h1 className="text-3xl font-bold text-[#1F9BA6] font-headline">Probate Lead Command Center</h1>
            <p className="text-[#1F9BA6]/70">Automated Lead Generation, Valuation, and Contracting.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="rounded-full border-[#1F9BA6] text-[#1F9BA6] hover:bg-[#1F9BA6]/5">
              <Link href="/dashboard">
                <History className="mr-2 h-4 w-4" /> Main Dashboard
              </Link>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1F9BA6] hover:bg-[#1F9BA6]/90 rounded-full px-6">
                  <Plus className="mr-2 h-4 w-4" /> Import County Records
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Probate Case</DialogTitle>
                  <DialogDescription>Manually enter lead data found in public records.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="deceased">Deceased Owner Name</Label>
                    <Input id="deceased" placeholder="e.g. Samuel L. Jackson" value={newLead.deceasedName} onChange={e => setNewLead({...newLead, deceasedName: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Subject Property Address</Label>
                    <Input id="address" placeholder="123 Street, City, ST" value={newLead.propertyAddress} onChange={e => setNewLead({...newLead, propertyAddress: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rep">Heir / Personal Representative</Label>
                    <Input id="rep" placeholder="e.g. Mary Jackson (Wife)" value={newLead.representativeName} onChange={e => setNewLead({...newLead, representativeName: e.target.value})} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddLead} className="bg-[#2EE69D] text-black hover:bg-[#2EE69D]/80 w-full rounded-full">Save to Pipeline</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
              { label: "New Leads", value: leads.filter(l => l.status === 'NEW').length, icon: Users, color: "blue" },
              { label: "Skip Traced", value: leads.filter(l => l.status === 'SKIP_TRACED').length, icon: Search, color: "purple" },
              { label: "Pipeline", value: leads.filter(l => l.status === 'UNDER_CONTRACT').length, icon: FileText, color: "green" },
              { label: "Commission", value: leads.filter(l => l.status === 'SOLD').length * 10000, icon: TrendingUp, color: "yellow", prefix: "$" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between relative">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-black mt-1">
                      {stat.prefix}{stat.value.toLocaleString()}
                  </h3>
                </div>
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pipeline Management</CardTitle>
                <CardDescription>Track and automate probate acquisitions.</CardDescription>
              </div>
              <Badge variant="outline" className="bg-[#EEF4F5]">Virtual Mode Active</Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Property / Lead</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Institutional Offer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="group transition-colors">
                      <TableCell>
                        <div className="font-bold text-[#1F9BA6]">{lead.propertyAddress}</div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          Owner: {lead.deceasedName} (Deceased)
                        </div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                          Rep: {lead.representativeName} {lead.representativePhone && `| ${lead.representativePhone}`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                            lead.status === 'UNDER_CONTRACT' ? 'border-green-500 text-green-600 bg-green-50' :
                            lead.status === 'SKIP_TRACED' ? 'border-purple-500 text-purple-600 bg-purple-50' :
                            'border-slate-200'
                        }>
                          {lead.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lead.wholesaleOfferPrice ? (
                          <div className="space-y-1">
                              <div className="font-bold text-green-600">${lead.wholesaleOfferPrice.toLocaleString()}</div>
                              <div className="text-[10px] text-muted-foreground">ARV: ${lead.estimatedARV?.toLocaleString()}</div>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost" className="text-[10px] h-6 px-2 hover:bg-[#1F9BA6]/5" onClick={() => handleValuation(lead.id)}>
                              Run AI Valuation
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {lead.status === 'NEW' ? (
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full border-purple-200 text-purple-600 hover:bg-purple-50" onClick={() => handleSkipTrace(lead.id)}>
                              <Search className="h-3.5 w-3.5" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => handleGenerateOutreach(lead)}>
                              <Mail className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full border-[#2EE69D] text-[#1F9BA6] hover:bg-[#2EE69D]/10" onClick={() => handleGenerateContract(lead)}>
                            <ClipboardCheck className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" className="h-8 w-8 p-0 rounded-full bg-[#1F9BA6] text-white" asChild>
                              <Link href="/list-property">
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-primary/5 border-l-4 border-l-[#1F9BA6]">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-[#1F9BA6]" /> 90% Rule Logic
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        Maximized for institutional hedge funds and capital-heavy investors.
                    </div>
                    <div className="bg-white/50 p-3 rounded-lg border border-dashed border-[#1F9BA6]/20">
                        <code className="text-xs font-bold text-[#1F9BA6]">Offer = (ARV * 0.9) - (Repairs * 2)</code>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                        This formula accounts for the risk and cost of capital for institutional buyers, ensuring your contracts are highly assignable.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-[#2EE69D]" /> AI Outreach
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {outreachResult ? (
                        <div className="space-y-4">
                            <div className="p-3 bg-[#EEF4F5] rounded-xl text-sm border border-[#1F9BA6]/10">
                                <div className="font-bold text-[#1F9BA6] mb-2">{outreachResult.headline}</div>
                                <div className="text-xs leading-relaxed text-slate-600 whitespace-pre-wrap">{outreachResult.body}</div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Communication Tips:</p>
                                {outreachResult.tips.map((tip: string, i: number) => (
                                    <div key={i} className="flex gap-2 items-start text-[10px] text-slate-500">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#2EE69D] mt-1 shrink-0" />
                                        {tip}
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full rounded-full h-9 text-xs" onClick={() => {
                                navigator.clipboard.writeText(outreachResult.body);
                                toast({ title: "Copied", description: "Message copied to clipboard." });
                            }}>Copy Message</Button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Mail className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
                            <p className="text-xs text-muted-foreground">Select a lead to generate empathetic AI outreach.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex gap-8">
                <div className="text-xs">
                    <p className="text-muted-foreground uppercase font-bold">Today's Leads</p>
                    <p className="font-bold text-[#1F9BA6]">4 New Cases</p>
                </div>
                <div className="text-xs">
                    <p className="text-muted-foreground uppercase font-bold">Market Heat</p>
                    <p className="font-bold text-[#2EE69D]">High Demand</p>
                </div>
              </div>
              <Button size="sm" className="bg-[#2EE69D] text-black hover:bg-[#2EE69D]/80 rounded-full px-8 font-bold" asChild>
                  <Link href="/list-property">POST DEAL TO INVESTOR LIFT</Link>
              </Button>
          </div>
      </div>
    </div>
  );
}
