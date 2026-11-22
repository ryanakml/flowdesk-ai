import { useState } from "react";
import { Clock, DollarSign, Sparkles, Zap } from "lucide-react";

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
    <div className="relative mx-auto w-full max-w-6xl border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-6 sm:p-10 shadow-xs">
      {/* 8px Corner Registration Marks */}
      <span className="absolute top-2 left-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute top-2 right-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute bottom-2 left-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />
      <span className="absolute bottom-2 right-2 size-2 bg-[#d3cec6] dark:bg-[#383e48]" />

      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="size-2 bg-[#0007cb]" />
          <span className="font-mono text-xs uppercase tracking-wider text-[#111111] dark:text-[#f4f4f5]">
            COMPACT COMMERCIAL ESTIMATOR • ROI BENCHMARK
          </span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-normal tracking-[-0.0296em] text-[#111111] dark:text-[#f4f4f5] leading-[1.05]">
          <span className="text-[#a0a0a0]">Quantify the operational deflection on</span>
          <br />
          your customer support team.
        </h3>
        <p className="mt-4 font-serif text-base sm:text-lg text-[#585858] dark:text-[#a0a0a0] leading-relaxed max-w-2xl">
          Adjust your current monthly WhatsApp message volume and team size to calculate verified
          operator hours recovered, first-response acceleration, and deflection economics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Sliders Input Panel (5 cols) */}
        <div className="space-y-6 border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-6 lg:col-span-5 shadow-xs">
          {/* Slider 1: Conversations */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#111111] dark:text-[#f4f4f5] uppercase">
                MONTHLY WHATSAPP MESSAGES
              </span>
              <span className="text-[#0007cb] font-bold">{conversations.toLocaleString()} /mo</span>
            </div>
            <input
              type="range"
              min={2000}
              max={100000}
              step={1000}
              value={conversations}
              onChange={(e) => setConversations(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none bg-[#dedbd6] dark:bg-[#383e48] accent-[#111111] dark:accent-[#f4f4f5]"
            />
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#a0a0a0]">
              <span>2,000</span>
              <span>25,000</span>
              <span>50,000</span>
              <span>100,000+</span>
            </div>
          </div>

          {/* Slider 2: Agents */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#111111] dark:text-[#f4f4f5] uppercase">
                SUPPORT AGENTS ON TEAM
              </span>
              <span className="text-[#0007cb] font-bold">{agents} REPS</span>
            </div>
            <input
              type="range"
              min={2}
              max={40}
              step={1}
              value={agents}
              onChange={(e) => setAgents(Number(e.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none bg-[#dedbd6] dark:bg-[#383e48] accent-[#111111] dark:accent-[#f4f4f5]"
            />
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#a0a0a0]">
              <span>2 reps</span>
              <span>10 reps</span>
              <span>25 reps</span>
              <span>40 reps</span>
            </div>
          </div>

          {/* Benchmark Explanation Note */}
          <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-[#faf9f6] dark:bg-[#181b20] p-3.5 text-xs leading-relaxed text-[#585858] dark:text-[#a0a0a0] font-serif">
            <span className="font-semibold text-[#111111] dark:text-[#f4f4f5] font-sans">
              Conservative Benchmark:
            </span>{" "}
            Assumes 58% tier-1 inquiry deflection with grounded RAG drafts and 4.5 minutes saved per
            verified customer reply.
          </div>
        </div>

        {/* Calculated Results Panel (7 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-7">
          {/* Card 1: Hours Saved Monthly */}
          <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#0007cb]">
              <Clock className="size-3.5" />
              <span>TIME RECOVERED</span>
            </div>
            <p className="mt-4 font-mono text-3xl sm:text-4xl font-normal text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              {totalMonthlyHoursSaved.toLocaleString()} hrs
            </p>
            <p className="mt-2 text-xs text-[#707070]">
              ~{hoursSavedPerAgent} hours saved per agent every month
            </p>
          </div>

          {/* Card 2: Annual Cost Deflection */}
          <div className="border border-[#0007cb]/30 bg-[#0007cb]/5 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#0007cb]">
              <DollarSign className="size-3.5" />
              <span>ANNUAL COST RECOVERY</span>
            </div>
            <p className="mt-4 font-mono text-3xl sm:text-4xl font-normal text-[#0007cb] tracking-tight">
              ${annualCostSavings.toLocaleString()}
            </p>
            <p className="mt-2 text-xs text-[#585858] dark:text-[#a0a0a0]">
              ${monthlyCostSavings.toLocaleString()}/mo in reclaimed operator productivity
            </p>
          </div>

          {/* Card 3: Inquiries Deflected */}
          <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#707070]">
              <Sparkles className="size-3.5 text-[#0007cb]" />
              <span>TIER-1 DEFLECTION</span>
            </div>
            <p className="mt-4 font-mono text-3xl sm:text-4xl font-normal text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              {totalMonthlyTicketsDeflected.toLocaleString()}
            </p>
            <p className="mt-2 text-xs text-[#707070]">
              Repetitive tickets drafted with verified source citations
            </p>
          </div>

          {/* Card 4: First Response Acceleration */}
          <div className="border border-[#dedbd6] dark:border-[#2b3038] bg-white dark:bg-[#121417] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#707070]">
              <Zap className="size-3.5 text-[#ff5600]" />
              <span>FIRST RESPONSE SPEED</span>
            </div>
            <p className="mt-4 font-mono text-3xl sm:text-4xl font-normal text-[#111111] dark:text-[#f4f4f5] tracking-tight">
              &lt; 15 sec
            </p>
            <p className="mt-2 text-xs text-[#707070]">Down from 38+ minutes manual queue delay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
