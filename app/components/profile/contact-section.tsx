import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { Button } from '~/components/ui/button';

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
    <div className="mb-8 px-4">
      <div className="flex items-center bg-gray-100/70 border border-gray-200/80 rounded-lg p-3">
        <Mail className="text-gray-400 mr-3" size={20} />
        <span className="text-gray-700 text-sm flex-1">{email}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyEmail}
          className="ml-2 h-8 w-8 text-gray-400 hover:text-gray-800"
          aria-label="Copy email address"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
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
