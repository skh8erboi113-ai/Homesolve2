
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc } from "@/firebase";
import { collection, query, where, orderBy, doc, serverTimestamp } from "firebase/firestore";
import { Loader2, Send, User, Home, ArrowLeft, MessageSquare } from "lucide-react";
import { addDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { formatDistanceToNow } from "date-fns";

function MessagesContent() {
  const searchParams = useSearchParams();
  const activeConvId = searchParams.get("id");
  const db = useFirestore();
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState("");

  const convsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(db, "conversations"),
      where("participantIds", "array-contains", user.uid),
      orderBy("lastMessageAt", "desc")
    );
  }, [db, user]);

  const { data: conversations, isLoading: loadingConvs } = useCollection(convsQuery);

  const activeConvRef = useMemoFirebase(() => {
    if (!activeConvId) return null;
    return doc(db, "conversations", activeConvId);
  }, [db, activeConvId]);

  const { data: activeConv } = useDoc(activeConvRef);

  const messagesQuery = useMemoFirebase(() => {
    if (!activeConvId) return null;
    return query(
      collection(db, "conversations", activeConvId, "messages"),
      orderBy("sentAt", "asc")
    );
  }, [db, activeConvId]);

  const { data: messages, isLoading: loadingMessages } = useCollection(messagesQuery);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvId || !user) return;

    const messageData = {
      conversationId: activeConvId,
      senderId: user.uid,
      content: newMessage,
      sentAt: serverTimestamp(),
      isRead: false,
      conversationParticipantIds: activeConv?.participantIds || []
    };

    addDocumentNonBlocking(collection(db, "conversations", activeConvId, "messages"), messageData);
    updateDocumentNonBlocking(doc(db, "conversations", activeConvId), {
      lastMessageAt: serverTimestamp()
    });
    setNewMessage("");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-bold mb-4">Please sign in to view messages.</h2>
        <Button asChild><a href="/auth">Sign In</a></Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Sidebar: Conversation List */}
      <Card className={`md:block ${activeConvId ? 'hidden' : 'block'} border-none shadow-sm`}>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            {loadingConvs ? (
              <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto h-6 w-6" /></div>
            ) : conversations?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No conversations yet.</div>
            ) : (
              <div className="divide-y">
                {conversations?.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => window.history.pushState({}, '', `/messages?id=${conv.id}`)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-accent transition-colors text-left ${activeConvId === conv.id ? 'bg-accent/50' : ''}`}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold truncate text-sm">{conv.subject || "No Subject"}</span>
                        {conv.lastMessageAt && (
                          <span className="text-[10px] text-muted-foreground">
                            {formatDistanceToNow(new Date(conv.lastMessageAt.seconds * 1000))} ago
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">Click to view messages</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main: Message View */}
      <Card className={`md:col-span-2 flex flex-col ${!activeConvId ? 'hidden md:flex' : 'flex'} border-none shadow-sm h-full overflow-hidden`}>
        {!activeConvId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        ) : (
          <>
            <CardHeader className="border-b p-4 flex flex-row items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => window.history.pushState({}, '', '/messages')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-base font-bold">{activeConv?.subject}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <Home className="h-3 w-3" /> Property ID: {activeConv?.propertyListingId?.substring(0,8)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {loadingMessages ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin h-6 w-6" /></div>
                ) : (
                  <div className="space-y-4">
                    {messages?.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 px-4 ${
                          msg.senderId === user.uid ? 'bg-primary text-white' : 'bg-muted'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                          <p className={`text-[10px] mt-1 ${msg.senderId === user.uid ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {msg.sentAt && formatDistanceToNow(new Date(msg.sentAt.seconds * 1000))} ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              <div className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading messaging...</div>}>
          <MessagesContent />
        </Suspense>
      </main>
    </div>
  );
}
