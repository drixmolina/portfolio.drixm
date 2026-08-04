import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import { profile } from "../../data/portfolioData";

type ChatRole = "assistant" | "user";
type AssistantAudience = "recruiter" | "developer" | "client";
type ComposerMode = "question" | "job-match";

interface ChatAction {
  label: string;
  href: string;
}

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  actions?: ChatAction[];
}

interface SuggestedQuestion {
  label: string;
  prompt?: string;
  kind?: ComposerMode;
}

const SESSION_LIMIT = 8;
const SESSION_STORAGE_KEY = "ask-drix-session-questions";
const QUESTION_MAX_LENGTH = 600;
const JOB_DESCRIPTION_MAX_LENGTH = 2_400;

const AUDIENCE_OPTIONS: Array<{
  id: AssistantAudience;
  label: string;
  description: string;
}> = [
  {
    id: "recruiter",
    label: "Recruiter",
    description: "Role fit, experience, availability, and hiring evidence.",
  },
  {
    id: "developer",
    label: "Developer",
    description: "Architecture, workflows, testing, stack, and source.",
  },
  {
    id: "client",
    label: "Client",
    description: "Capabilities, relevant projects, and next-step contact.",
  },
];

const SUGGESTED_QUESTIONS: Record<
  AssistantAudience,
  SuggestedQuestion[]
> = {
  recruiter: [
    {
      label: "Why should we hire Drix?",
      prompt: "Why should a team hire Drix for a junior full-stack role?",
    },
    {
      label: "Which project best proves full-stack ability?",
      prompt:
        "Which project best demonstrates Drix's fit for a junior full-stack role?",
    },
    {
      label: "Match Drix to a job description",
      kind: "job-match",
    },
  ],
  developer: [
    {
      label: "How is FacilitEASE architected?",
      prompt: "Explain FacilitEASE's documented architecture and workflows.",
    },
    {
      label: "What backend workflows has Drix built?",
      prompt:
        "What backend and data workflows has Drix demonstrated in his projects?",
    },
    {
      label: "Which source code can I review?",
      prompt: "Which of Drix's projects have public source code I can review?",
    },
  ],
  client: [
    {
      label: "What can Drix build for a business?",
      prompt:
        "Based on his verified projects, what kinds of business systems can Drix build?",
    },
    {
      label: "Tell me about the e-commerce project",
      prompt:
        "Explain the DEADKIDS e-commerce project in clear business terms.",
    },
    {
      label: "How can I discuss a project with Drix?",
      prompt:
        "How can a potential client contact Drix to discuss a project?",
    },
  ],
};

const WELCOME_MESSAGES: Record<AssistantAudience, string> = {
  recruiter:
    "I’m Drix’s AI Recruiter Concierge. Ask about role fit, current experience, demonstrated skills, or match him to a job description.",
  developer:
    "Technical view selected. Ask about architecture, workflows, testing, technologies, or reviewable source.",
  client:
    "Client view selected. Ask what Drix can build, which project is most relevant, or how to discuss a project with him.",
};

function createMessage(
  role: ChatRole,
  content: string,
  actions?: ChatAction[],
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    actions,
  };
}

function createWelcomeMessage(audience: AssistantAudience): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: WELCOME_MESSAGES[audience],
  };
}

function getStoredQuestionCount() {
  const stored = Number(sessionStorage.getItem(SESSION_STORAGE_KEY) ?? 0);
  return Number.isFinite(stored)
    ? Math.min(Math.max(stored, 0), SESSION_LIMIT)
    : 0;
}

function summarizeJobDescription(jobDescription: string) {
  const normalized = jobDescription.replace(/\s+/g, " ").trim();
  return normalized.length > 170
    ? `${normalized.slice(0, 170)}…`
    : normalized;
}

function isExternalAction(href: string) {
  return href.startsWith("http");
}

export function RecruiterAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [audience, setAudience] =
    useState<AssistantAudience>("recruiter");
  const [composerMode, setComposerMode] =
    useState<ComposerMode>("question");
  const [messages, setMessages] = useState<ChatMessage[]>([
    createWelcomeMessage("recruiter"),
  ]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(getStoredQuestionCount);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const questionsRemaining = Math.max(SESSION_LIMIT - questionCount, 0);
  const isJobMatch = composerMode === "job-match";
  const activeAudience = AUDIENCE_OPTIONS.find(
    (option) => option.id === audience,
  );

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [isLoading, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const selectAudience = (nextAudience: AssistantAudience) => {
    if (nextAudience === audience) {
      return;
    }

    setAudience(nextAudience);
    setComposerMode("question");
    setQuestion("");
    setMessages((currentMessages) =>
      currentMessages.length === 1 &&
      currentMessages[0]?.id === "welcome"
        ? [createWelcomeMessage(nextAudience)]
        : currentMessages,
    );
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const openJobMatcher = () => {
    setComposerMode("job-match");
    setQuestion("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const sendQuestion = async (
    nextQuestion: string,
    jobDescription = "",
  ) => {
    const trimmedQuestion = nextQuestion.trim();
    const trimmedJobDescription = jobDescription.trim();

    if (
      !trimmedQuestion ||
      isLoading ||
      questionsRemaining === 0 ||
      (isJobMatch && !trimmedJobDescription)
    ) {
      return;
    }

    const displayQuestion = trimmedJobDescription
      ? `Match Drix to this role:\n${summarizeJobDescription(trimmedJobDescription)}`
      : trimmedQuestion;
    const userMessage = createMessage("user", displayQuestion);
    const history = messages
      .filter((message) => message.id !== "welcome")
      .slice(-6)
      .map(({ role, content }) => ({ role, content }));

    setQuestion("");
    setComposerMode("question");
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsLoading(true);

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    sessionStorage.setItem(SESSION_STORAGE_KEY, String(nextCount));

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience,
          history,
          jobDescription: trimmedJobDescription || undefined,
          message: trimmedQuestion,
        }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        actions?: ChatAction[];
        answer?: string;
        error?: string;
      };

      if (!response.ok || !payload.answer) {
        throw new Error(
          payload.error ??
            "Ask Drix is temporarily unavailable. Please try again shortly.",
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage("assistant", payload.answer, payload.actions),
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage(
          "assistant",
          error instanceof Error
            ? error.message
            : "Ask Drix is temporarily unavailable. Please use the résumé or contact links below.",
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className={`ai-assistant${isOpen ? " is-open" : ""}`}>
      {isOpen ? (
        <section
          id="ask-drix-panel"
          className="ai-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="ask-drix-title"
        >
          <header className="ai-assistant-header">
            <div>
              <span className="ai-assistant-kicker">
                <Sparkles aria-hidden="true" size={14} />
                Recruiter concierge
              </span>
              <h2 id="ask-drix-title">Ask Drix</h2>
              <p>Evidence-backed answers for hiring teams.</p>
            </div>
            <button
              type="button"
              className="ai-assistant-close"
              aria-label="Close Ask Drix"
              onClick={() => {
                setIsOpen(false);
                requestAnimationFrame(() => launcherRef.current?.focus());
              }}
            >
              <X aria-hidden="true" size={18} />
            </button>
          </header>

          <div className="ai-audience-selector">
            <span className="ai-audience-label">Tailor answers for</span>
            <div role="group" aria-label="Choose visitor perspective">
              {AUDIENCE_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  aria-pressed={audience === option.id}
                  onClick={() => selectAudience(option.id)}
                  disabled={isLoading}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p>{activeAudience?.description}</p>
          </div>

          <div
            className="ai-assistant-messages"
            ref={scrollAreaRef}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {messages.map((message) => (
              <div
                className={`ai-message ai-message-${message.role}`}
                key={message.id}
              >
                <span className="ai-message-label">
                  {message.role === "assistant" ? "Ask Drix" : "You"}
                </span>
                <p>{message.content}</p>
                {message.actions?.length ? (
                  <div
                    className="ai-message-actions"
                    aria-label="Recommended links"
                  >
                    {message.actions.map((action) => (
                      <a
                        href={action.href}
                        key={`${message.id}-${action.href}`}
                        target={
                          isExternalAction(action.href) ? "_blank" : undefined
                        }
                        rel={
                          isExternalAction(action.href)
                            ? "noreferrer"
                            : undefined
                        }
                      >
                        {action.label}
                        <ArrowUpRight aria-hidden="true" size={12} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {isLoading ? (
              <div className="ai-message ai-message-assistant ai-message-loading">
                <span className="sr-only">Ask Drix is preparing a response.</span>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </div>
            ) : null}
          </div>

          {messages.length === 1 && !isJobMatch ? (
            <div
              className="ai-assistant-suggestions"
              aria-label={`${activeAudience?.label} suggested questions`}
            >
              {SUGGESTED_QUESTIONS[audience].map((suggestion) => (
                <button
                  type="button"
                  key={suggestion.label}
                  onClick={() =>
                    suggestion.kind === "job-match"
                      ? openJobMatcher()
                      : void sendQuestion(
                          suggestion.prompt ?? suggestion.label,
                        )
                  }
                  disabled={isLoading || questionsRemaining === 0}
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className={`ai-assistant-form${
              isJobMatch ? " is-job-match" : ""
            }`}
            onSubmit={(event) => {
              event.preventDefault();
              void sendQuestion(
                isJobMatch
                  ? "Assess Drix's documented fit for this job description."
                  : question,
                isJobMatch ? question : "",
              );
            }}
          >
            {isJobMatch ? (
              <div className="ai-composer-context">
                <div>
                  <strong>Job-description matcher</strong>
                  <span>
                    Paste role requirements only. Remove confidential details.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setComposerMode("question");
                    setQuestion("");
                    requestAnimationFrame(() => inputRef.current?.focus());
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : null}

            <label className="sr-only" htmlFor="ask-drix-question">
              {isJobMatch
                ? "Paste a job description to compare with Drix's portfolio"
                : "Ask a question about Drix"}
            </label>
            <textarea
              id="ask-drix-question"
              ref={inputRef}
              rows={isJobMatch ? 4 : 1}
              value={question}
              maxLength={
                isJobMatch
                  ? JOB_DESCRIPTION_MAX_LENGTH
                  : QUESTION_MAX_LENGTH
              }
              placeholder={
                questionsRemaining === 0
                  ? "Session question limit reached"
                  : isJobMatch
                    ? "Paste the job description or key requirements…"
                    : `Ask from the ${activeAudience?.label.toLowerCase()} perspective…`
              }
              onChange={(event) => setQuestion(event.target.value)}
              disabled={isLoading || questionsRemaining === 0}
            />
            <button
              type="submit"
              aria-label={
                isJobMatch ? "Match job description" : "Send question"
              }
              disabled={
                isLoading || questionsRemaining === 0 || !question.trim()
              }
            >
              <Send aria-hidden="true" size={17} />
            </button>
            {isJobMatch ? (
              <span className="ai-character-count">
                {question.length.toLocaleString()} /{" "}
                {JOB_DESCRIPTION_MAX_LENGTH.toLocaleString()}
              </span>
            ) : null}
          </form>

          <footer className="ai-assistant-footer">
            <div>
              <span>Powered by Gemini</span>
              <span aria-hidden="true">·</span>
              <span>
                {questionsRemaining} question
                {questionsRemaining === 1 ? "" : "s"} left
              </span>
            </div>
            <div>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Résumé <ArrowUpRight aria-hidden="true" size={12} />
              </a>
              <a href={`mailto:${profile.email}`}>
                Contact <ArrowUpRight aria-hidden="true" size={12} />
              </a>
            </div>
            <p>Do not share confidential or sensitive information.</p>
          </footer>
        </section>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        className="ai-assistant-launcher"
        aria-expanded={isOpen}
        aria-controls="ask-drix-panel"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <Sparkles aria-hidden="true" size={17} />
        <span>Ask Drix</span>
        <span className="ai-assistant-status" aria-hidden="true" />
      </button>
    </aside>
  );
}
