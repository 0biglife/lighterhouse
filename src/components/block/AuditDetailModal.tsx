import { AuditSummaryItem } from "@/lib/types";
import { Dialog } from "@headlessui/react";
import { X, ExternalLink } from "lucide-react";

type Props = {
  audit: AuditSummaryItem;
  isOpen: boolean;
  onClose: () => void;
};

export default function AuditDetailModal({ audit, isOpen, onClose }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4 bg-black/50">
        <Dialog.Panel className="relative bg-gray-100 dark:bg-[#18181b] rounded-xl p-6 max-w-xl w-full shadow-lg">
          {/* Header with Title + LearnMore + Close */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Dialog.Title className="text-xl font-bold">
                {audit.title}
              </Dialog.Title>

              {/* Tooltip Wrapper */}
              <a
                href={audit.learnMoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                  자세히 보기
                </span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">{audit.description}</p>

          {audit.displayValue && (
            <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">
              현재 상태: {audit.displayValue}
            </p>
          )}

          <p className="text-sm text-green-700 dark:text-green-400 mb-4">
            예상 점수 개선: +{audit.estimatedScoreGain}점
          </p>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
