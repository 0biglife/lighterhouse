import { AuditSummaryItem } from "@/lib/types";
import { Dialog } from "@headlessui/react";

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
        <Dialog.Panel className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-xl w-full shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-2">
            {audit.title}
          </Dialog.Title>
          <p className="text-sm text-gray-500 mb-4">{audit.description}</p>

          {audit.displayValue && (
            <p className="text-sm text-blue-600 dark:text-blue-300 mb-2">
              현재 상태: {audit.displayValue}
            </p>
          )}

          <p className="text-sm text-green-700 dark:text-green-400 mb-4">
            예상 점수 개선: +{audit.estimatedScoreGain}점
          </p>

          <a
            href={audit.learnMoreLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline text-blue-600 dark:text-blue-400"
          >
            자세히 보기 →
          </a>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-slate-700 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600"
            >
              닫기
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
