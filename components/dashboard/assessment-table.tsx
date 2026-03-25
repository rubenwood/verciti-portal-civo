"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { assessmentAttemptData, type AssessmentAttempt, type AssessmentQuestion } from "@/lib/mock-data";
import { cn, anonymizeEmail, getAvatarInitials } from "@/lib/utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function UserAvatar({ email }: { email: string }) {
  const initials = getAvatarInitials(email);
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a5d23] text-xs font-medium text-white shrink-0 uppercase">
      {initials}
    </div>
  );
}

function QuestionDetails({ question }: { question: AssessmentQuestion }) {
  return (
    <div className={cn(
      "rounded-lg border p-4",
      question.isCorrect 
        ? "border-success/30 bg-success/5" 
        : "border-destructive/30 bg-destructive/5"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "mt-0.5 rounded-full p-1 shrink-0",
          question.isCorrect ? "bg-success/20" : "bg-destructive/20"
        )}>
          {question.isCorrect ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <XCircle className="h-4 w-4 text-destructive" />
          )}
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Question {question.questionNumber}
            </span>
            <span className={cn(
              "text-xs font-medium",
              question.isCorrect ? "text-success" : "text-destructive"
            )}>
              {question.points}/{question.maxPoints} points
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">
            {question.questionText}
          </p>

          {question.options && (
            <div className="space-y-1">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 rounded px-2 py-1 text-sm",
                    option === question.correctAnswer && "bg-success/10 text-success",
                    option === question.userAnswer && option !== question.correctAnswer && "bg-destructive/10 text-destructive",
                    option !== question.correctAnswer && option !== question.userAnswer && "text-muted-foreground"
                  )}
                >
                  {option === question.correctAnswer && (
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                  )}
                  {option === question.userAnswer && option !== question.correctAnswer && (
                    <XCircle className="h-3 w-3 shrink-0" />
                  )}
                  <span>{option}</span>
                </div>
              ))}
            </div>
          )}

          {!question.options && (
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">User Answer:</p>
                <p className={cn(
                  "rounded-md p-2 text-sm",
                  question.isCorrect ? "bg-success/10 text-success" : "bg-muted text-foreground"
                )}>
                  {question.userAnswer}
                </p>
              </div>
              {!question.isCorrect && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expected Answer:</p>
                  <p className="rounded-md bg-success/10 p-2 text-success text-sm">
                    {question.correctAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AssessmentRow({ attempt }: { attempt: AssessmentAttempt }) {
  const [expanded, setExpanded] = useState(false);
  const scorePercentage = Math.round((attempt.score / attempt.maxScore) * 100);
  const correctCount = attempt.questions.filter(q => q.isCorrect).length;
  const displayEmail = anonymizeEmail(attempt.anonymizedEmail);

  return (
    <>
      <TableRow 
        className="border-border hover:bg-muted/20 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell>
          <div className="flex items-center gap-3">
            <UserAvatar email={attempt.anonymizedEmail} />
            <span className="text-foreground">{displayEmail}</span>
          </div>
        </TableCell>
        <TableCell className="text-foreground">
          {attempt.assessmentName}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDate(attempt.timestamp)}
        </TableCell>
        <TableCell className="text-foreground">
          {scorePercentage}%
        </TableCell>
        <TableCell className="text-muted-foreground">
          {correctCount} / {attempt.questions.length}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {attempt.duration}
        </TableCell>
        <TableCell>
          <div className="h-6 w-6 flex items-center justify-center text-muted-foreground">
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow className="border-border bg-muted/10 hover:bg-muted/10">
          <TableCell colSpan={7} className="p-0">
            <div className="p-4 space-y-3">
              {attempt.questions.map((question) => (
                <QuestionDetails key={question.id} question={question} />
              ))}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export function AssessmentTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">Assessment Attempts</h3>
        <p className="text-sm text-muted-foreground">
          Detailed view of assessment attempts with questions and answers
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-normal">User</TableHead>
            <TableHead className="text-muted-foreground font-normal">Assessment</TableHead>
            <TableHead className="text-muted-foreground font-normal">Date</TableHead>
            <TableHead className="text-muted-foreground font-normal">%</TableHead>
            <TableHead className="text-muted-foreground font-normal">#</TableHead>
            <TableHead className="text-muted-foreground font-normal">Duration</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessmentAttemptData.map((attempt) => (
            <AssessmentRow key={attempt.id} attempt={attempt} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
