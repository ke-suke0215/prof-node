import { useState } from 'react';
import { Button } from '~/components/ui/button';

// Custom Mail icon component
function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// Custom Copy icon component
function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

// Custom Check icon component
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

interface ContactSectionProps {
  email: string;
}

export function ContactSection({ email }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    if (typeof window !== 'undefined' && window.navigator?.clipboard) {
      try {
        await window.navigator.clipboard.writeText(email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy email:', error);
        // Fallback to alert
        window.alert('メールアドレスをコピーしました！');
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center bg-gray-100/70 border border-gray-200/80 rounded-lg p-3">
        <MailIcon />
        <span className="text-gray-700 text-sm flex-1 ml-3 truncate">
          {email}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyEmail}
          className="ml-2 h-8 w-8 text-gray-400 hover:text-gray-800"
          aria-label="Copy email address"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>

      {copied && (
        <div className="text-center mt-2">
          <span className="text-sm text-green-600 font-medium">
            メールアドレスをコピーしました！
          </span>
        </div>
      )}
    </div>
  );
}
