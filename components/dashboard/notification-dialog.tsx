"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, MessageSquare, Smartphone, Send } from "lucide-react";
import { toast } from "sonner";

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userEmail: string;
  userId: string;
}

export function NotificationDialog({
  open,
  onOpenChange,
  userName,
  userEmail,
  userId,
}: NotificationDialogProps) {
  const [notificationType, setNotificationType] = useState<"email" | "app" | "sms">("email");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setSending(true);
    
    // Simulate sending notification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSending(false);
    toast.success(`${notificationType.toUpperCase()} notification sent to ${userName}`);
    onOpenChange(false);
    setSubject("");
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Send Notification</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Send a notification to {userName} ({userId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Notification Type */}
          <div className="space-y-3">
            <Label className="text-card-foreground">Notification Type</Label>
            <RadioGroup
              value={notificationType}
              onValueChange={(value) => setNotificationType(value as "email" | "app" | "sms")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer text-card-foreground">
                  <Mail className="h-4 w-4 text-chart-2" />
                  Email
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="app" id="app" />
                <Label htmlFor="app" className="flex items-center gap-2 cursor-pointer text-card-foreground">
                  <MessageSquare className="h-4 w-4 text-chart-1" />
                  In-App
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer text-card-foreground">
                  <Smartphone className="h-4 w-4 text-chart-3" />
                  SMS
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Recipient Info */}
          <div className="rounded-lg bg-muted p-3">
            <p className="text-sm text-muted-foreground">Recipient</p>
            <p className="font-medium text-card-foreground">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>

          {/* Subject (for email) */}
          {notificationType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-card-foreground">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter email subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-background"
              />
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-card-foreground">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-background"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={sending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {sending ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send {notificationType === "email" ? "Email" : notificationType === "app" ? "Notification" : "SMS"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
