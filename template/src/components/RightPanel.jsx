import React from 'react';

export default function RightPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen p-4 bg-white/60 backdrop-blur-md border-l border-primary/10 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Shared files</h3>
        <button className="text-xs text-secondary">10 members</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div>
            <div className="text-sm font-medium">Real estate deals</div>
            <div className="text-xs text-secondary">10 members</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <div className="text-xs text-secondary">All files</div>
            <div className="text-lg font-semibold">231</div>
          </div>
          <div className="p-3 bg-white rounded shadow-sm">
            <div className="text-xs text-secondary">All links</div>
            <div className="text-lg font-semibold">45</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm">Documents</div>
            <div className="text-xs text-secondary">126 files</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Photos</div>
            <div className="text-xs text-secondary">53 files</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
