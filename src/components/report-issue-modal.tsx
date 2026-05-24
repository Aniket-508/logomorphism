"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
}

export default function ReportIssueModal({ isOpen, onClose, brand }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Issue — {brand}</DialogTitle>
          <DialogDescription>
            Let us know if there's a problem with this logo. We'll review and
            fix it.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <p className="text-sm text-muted-foreground">
            Thanks for reporting! We&apos;ll look into it.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title"
              required
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
