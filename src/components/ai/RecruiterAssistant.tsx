import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, Sparkles, X } from "lucide-react";
import { profile } from "../../data/portfolioData";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const SESSION_LIMIT = 8;
const SESSION_STORAGE_KEY = "ask-drix-session-questions";
const SUGGESTED_QUESTIONS = [
  "What are Drix's strongest projects?",
  "Why should we hire Drix?",
  "What is Drix's current experience?",
] as const;

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I’m Ask Drix. I can help recruiters explore Drix’s projects, experience, skills, and availability.",
};

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

function getStoredQuestionCount() {
  const stored = Number(sessionStorage.getItem(SESSION_STORAGE_KEY) ?? 0);
  return Number.isFinite(stored) ? Math.min(Math.max(stored, 0), SESSION_LIMIT) : 0;
}

export function RecruiterAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(getStoredQuestionCount);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const questionsRemaining = Math.max(SESSION_LIMIT - questionCount, 0);

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

  const sendQuestion = async (nextQuestion: string) => {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion || isLoading || questionsRemaining === 0) {
      return;
    }

    const userMessage = createMessage("user", trimmedQuestion);
    const history = messages
      .filter((message) => message.id !== "welcome")
      .slice(-6)
      .map(({ role, content }) => ({ role, content }));

    setQuestion("");
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setIsLoading(true);

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    sessionStorage.setItem(SESSION_STORAGE_KEY, String(nextCount));

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion, history }),
      });
      const payload = (await response.json()) as {
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
        createMessage("assistant", payload.answer as string),
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
                Recruiter assistant
              </span>
              <h2 id="ask-drix-title">Ask Drix</h2>
              <p>Grounded in verified portfolio details.</p>
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

          {messages.length === 1 ? (
            <div className="ai-assistant-suggestions" aria-label="Suggested questions">
              {SUGGESTED_QUESTIONS.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => void sendQuestion(suggestion)}
                  disabled={isLoading || questionsRemaining === 0}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="ai-assistant-form"
            onSubmit={(event) => {
              event.preventDefault();
              void sendQuestion(question);
            }}
          >
            <label className="sr-only" htmlFor="ask-drix-question">
              Ask a question about Drix
            </label>
            <input
              id="ask-drix-question"
              ref={inputRef}
              type="text"
              value={question}
              maxLength={400}
              placeholder={
                questionsRemaining > 0
                  ? "Ask about Drix’s work…"
                  : "Session question limit reached"
              }
              onChange={(event) => setQuestion(event.target.value)}
              disabled={isLoading || questionsRemaining === 0}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Send question"
              disabled={
                isLoading || questionsRemaining === 0 || !question.trim()
              }
            >
              <Send aria-hidden="true" size={17} />
            </button>
          </form>

          <footer className="ai-assistant-footer">
            <div>
              <span>Powered by Gemini</span>
              <span aria-hidden="true">·</span>
              <span>
                {questionsRemaining} question{questionsRemaining === 1 ? "" : "s"} left
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
