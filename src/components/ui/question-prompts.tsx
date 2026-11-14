// The question prompts (spec §4.16, §7.2): four quiet buttons that add a ready-made question to the question
// field. Questions the page can't answer itself (fees, maturity, custody, tax) become an action without looking
// like selection chips. Rendered by AskForm only after hydration (they need JS) and never in the 503 state.
// AskForm owns the behaviour: append on a new line, move focus to the end of the field, clear its error, and
// refuse (with `note`) when the question would pass 1,000 characters.
import { Plus } from "lucide-react";
import { Button } from "./button";

export const QUESTION_PROMPTS = [
  "What are the fees on ₹1 lakh?",
  "When would my investment mature, and can I exit early?",
  "Who holds my money?",
  "How will my profit be taxed?",
] as const;

export function QuestionPrompts({
  onPick,
  unavailable = false,
  note,
}: {
  onPick: (prompt: string) => void;
  /** While sending: the prompts stay focusable but do nothing (aria-disabled). */
  unavailable?: boolean;
  /** A line under the list, e.g. when there isn't room to add a prompt. */
  note?: string | null;
}) {
  return (
    <div>
      <p className="mb-2 text-body-md text-muted-foreground">Not sure what to ask? Tap to add:</p>
      {/* Round 18b: wrapped Light chips instead of a full-width list. They stay buttons (they add text), not radios. */}
      <ul className="flex flex-wrap gap-2">
        {QUESTION_PROMPTS.map((prompt) => (
          <li key={prompt} className="max-w-full">
            <Button
              type="button"
              variant="quiet"
              size="md"
              aria-disabled={unavailable || undefined}
              onClick={() => onPick(prompt)}
              className="min-h-10 justify-start rounded-full border-input/40 bg-background px-3.5 text-left text-body-md font-medium whitespace-normal hover:border-foreground hover:bg-background"
            >
              <Plus aria-hidden />
              {prompt}
            </Button>
          </li>
        ))}
      </ul>
      {note && <p className="mt-2 text-body-md text-muted-foreground">{note}</p>}
    </div>
  );
}
