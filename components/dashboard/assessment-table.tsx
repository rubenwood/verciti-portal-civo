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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  FileQuestion,
} from "lucide-react";
import { assessmentAttemptData, type AssessmentAttempt, type AssessmentQuestion } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function QuestionDetails({ question }: { question: AssessmentQuestion }) {
  return (
    <div className={cn(
      "rounded-lg border p-4",
      question.isCorrect 
        ? "border-success/30 bg-success/5" 
        : "border-destructive/30 bg-destructive/5"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "mt-0.5 rounded-full p-1",
            question.isCorrect ? "bg-success/20" : "bg-destructive/20"
          )}>
            {question.isCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
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
            <p className="text-sm font-medium text-card-foreground">
              {question.questionText}
            </p>

            {question.options && (
              <div className="space-y-1 pl-2">
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
                    "rounded-md p-2",
                    question.isCorrect ? "bg-success/10 text-success" : "bg-muted text-card-foreground"
                  )}>
                    {question.userAnswer}
                  </p>
                </div>
                {!question.isCorrect && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expected Answer:</p>
                    <p className="rounded-md bg-success/10 p-2 text-success">
                      {question.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssessmentRow({ attempt }: { attempt: AssessmentAttempt }) {
  const [expanded, setExpanded] = useState(false);
  const scorePercentage = (attempt.score / attempt.maxScore) * 100;
  const correctCount = attempt.questions.filter(q => q.isCorrect).length;

  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <TableRow className="border-border hover:bg-muted/30">
        <TableCell>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </TableCell>
        <TableCell className="font-medium text-card-foreground">
          {attempt.anonymizedName}
        </TableCell>
        <TableCell className="text-muted-foreground font-mono text-sm">
          {attempt.userId}
        </TableCell>
        <TableCell className="text-card-foreground">
          {attempt.assessmentName}
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="text-xs border-border text-muted-foreground">
            {attempt.module}
          </Badge>
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDateTime(attempt.timestamp)}
        </TableCell>
        <TableCell className="text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {attempt.duration}
          </span>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Progress 
              value={scorePercentage} 
              className="w-16 h-2"
            />
            <span className={cn(
              "text-sm font-medium",
              attempt.passed ? "text-success" : "text-destructive"
            )}>
              {attempt.score}%
            </span>
          </div>
        </TableCell>
        <TableCell>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              attempt.passed
                ? "bg-success/20 text-success border-success/30"
                : "bg-destructive/20 text-destructive border-destructive/30"
            )}
          >
            {attempt.passed ? "Passed" : "Failed"}
          </Badge>
        </TableCell>
      </TableRow>

      <CollapsibleContent asChild>
        <TableRow className="border-border bg-muted/10 hover:bg-muted/10">
          <TableCell colSpan={9} className="p-0">
            <div className="p-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                    <FileQuestion className="h-4 w-4 text-chart-2" />
                    Question Details
                  </h4>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      {correctCount}/{attempt.questions.length} correct
                    </span>
                    <span className={cn(
                      "font-medium",
                      attempt.passed ? "text-success" : "text-destructive"
                    )}>
                      Score: {attempt.score}/{attempt.maxScore}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {attempt.questions.map((question) => (
                    <QuestionDetails key={question.id} question={question} />
                  ))}
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AssessmentTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-lg font-semibold text-card-foreground">Assessment Attempts</h3>
        <p className="text-sm text-muted-foreground">
          Review detailed assessment results including questions and answers
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-10"></TableHead>
            <TableHead className="text-muted-foreground">User</TableHead>
            <TableHead className="text-muted-foreground">User ID</TableHead>
            <TableHead className="text-muted-foreground">Assessment</TableHead>
            <TableHead className="text-muted-foreground">Module</TableHead>
            <TableHead className="text-muted-foreground">Timestamp</TableHead>
            <TableHead className="text-muted-foreground">Duration</TableHead>
            <TableHead className="text-muted-foreground">Score</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
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
