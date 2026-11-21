import { useState } from "react";
import { Clock, DollarSign, Sparkles, Zap } from "lucide-react";
import { Badge } from "@flowdesk/ui";

export function CapacityCalculator() {
  const [conversations, setConversations] = useState<number>(15000);
  const [agents, setAgents] = useState<number>(6);

  // Model assumptions based on production telemetry
  const deflectionRate = 0.58; // 58% of repetitive FAQ and tier-1 inquiries handled by grounded AI drafts
  const minutesSavedPerTicket = 4.5; // Average minutes saved drafting and verifying
  const hourlyRateUsd = 24.0; // Benchmark customer operations rep hourly loaded cost

  const totalMonthlyTicketsDeflected = Math.round(conversations * deflectionRate);
  const totalMonthlyMinutesSaved = totalMonthlyTicketsDeflected * minutesSavedPerTicket;
  const totalMonthlyHoursSaved = Math.round(totalMonthlyMinutesSaved / 60);
  const hoursSavedPerAgent = Math.round(totalMonthlyHoursSaved / Math.max(agents, 1));
  const monthlyCostSavings = Math.round(totalMonthlyHoursSaved * hourlyRateUsd);
  const annualCostSavings = monthlyCostSavings * 12;

  return (
    <div className="relative mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-card/40 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          INTERACTIVE CAPACITY & ROI BENCHMARK
        </Badge>
        <h3 className="text-2xl font-bold tracking-tight sm:text-4xl text-foreground">
          Quantify the operational impact on{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            your support team.
          </span>
        </h3>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Adjust your current WhatsApp volume and team size to see real-world time recovery,
          first-response acceleration, and deflection metrics.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
        {/* Sliders Input Panel (5 cols) */}
        <div className="space-y-6 rounded-xl border border-border/80 bg-background/80 p-5 lg:col-span-5">
          {/* Slider 1: Conversations */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-foreground">Monthly WhatsApp Messages</span>
              <span className="font-mono text-primary text-sm font-bold">
                {conversations.toLocaleString()} /mo
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={100000}
              step={1000}
              value={conversations}
              onChange={(e) => setConversations(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>2,000</span>
              <span>25,000</span>
              <span>50,000</span>
              <span>100,000+</span>
            </div>
          </div>

          {/* Slider 2: Agents */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-foreground">Support Agents on Team</span>
              <span className="font-mono text-primary text-sm font-bold">{agents} Reps</span>
            </div>
            <input
              type="range"
              min={2}
              max={40}
              step={1}
              value={agents}
              onChange={(e) => setAgents(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
            />
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>2 reps</span>
              <span>10 reps</span>
              <span>25 reps</span>
              <span>40 reps</span>
            </div>
          </div>

          {/* Benchmark Explanation Note */}
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Conservative Benchmark:</span> Assumes
            58% tier-1 FAQ deflection with grounded AI drafts and 4.5 minutes saved per approved
            reply.
          </div>
        </div>

        {/* Calculated Results Panel (7 cols) */}
        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {/* Card 1: Hours Saved Monthly */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-medium text-primary font-mono">
              <Clock className="size-3.5" />
              <span>TIME RECOVERED</span>
            </div>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
              {totalMonthlyHoursSaved.toLocaleString()} hrs
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ~{hoursSavedPerAgent} hours saved per agent every month
            </p>
          </div>

          {/* Card 2: Annual Cost Deflection */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 font-mono">
              <DollarSign className="size-3.5" />
              <span>ANNUAL COST RECOVERY</span>
            </div>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
              ${annualCostSavings.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ${monthlyCostSavings.toLocaleString()} /mo in reclaimed operator productivity
            </p>
          </div>

          {/* Card 3: Inquiries Deflected */}
          <div className="rounded-xl border border-border/80 bg-background/80 p-4 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground font-mono">
              <Sparkles className="size-3.5 text-primary" />
              <span>TIER-1 DEFLECTION</span>
            </div>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
              {totalMonthlyTicketsDeflected.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Repetitive tickets drafted with verified source citations
            </p>
          </div>

          {/* Card 4: First Response Acceleration */}
          <div className="rounded-xl border border-border/80 bg-background/80 p-4 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground font-mono">
              <Zap className="size-3.5 text-amber-500" />
              <span>FIRST RESPONSE SPEED</span>
            </div>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-foreground">
              &lt; 15 sec
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Down from 38+ minutes manual queue delay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
